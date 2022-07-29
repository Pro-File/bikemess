import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.less";
import CategoriesPage from "./Containers/CategoiesPage/CategoriesPage";
import LandingPage from "./Containers/LandingPage/index";
import LayoutWrapper from "./Layout/LayoutWrapper";
import AddListings from "./Containers/AddListings";
import Brands from "./Containers/Brands";
import AdminLogin from "./Containers/AdminPanel/AdminLogin/AdminLogin";
import { db } from "./Services/firebaseConfig";
import { useDispatch } from "react-redux";
import { setAllListing } from "./Redux/Slices/AllListing";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminProfile from "./Containers/AdminPanel/AdminProfile/AdminProfile";
import AdminDashboard from "./Containers/AdminPanel/AdminDashboard/AdminDashboard";
import AdminListing from "./Containers/AdminPanel/AdminListing/AdminListing";
import AdminRequests from "./Containers/AdminPanel/AdminRequests.js/AdminRequests";
import { setAllRequest } from "./Redux/Slices/AllRequest";
import Dashboard from "./Containers/AdminPanel/Dashboard/Dashboard";
import EditListing from "./Containers/AdminPanel/EditListing/EditListing";

function App() {
  const [dataListings, setDataListings] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchListings();
    fetchRequest();
  }, []);

  const fetchListings = async () => {
    try {
      var query = await db()
        .collection("list")
        .onSnapshot((snapshot) => {
          const temp = [];
          snapshot.forEach((doc) => {
            if (doc.data().isDeleted === false) {
              temp.push({ ...doc.data(), id: doc.id });
            }
          });

          dispatch(setAllListing(temp));
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequest = async () => {
    try {
      var query = await db()
        .collection("request")
        .onSnapshot((snapshot) => {
          const temp = [];
          snapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id });
          });

          dispatch(setAllRequest(temp));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Switch>
        <LayoutWrapper>
          {/* Admin Routes */}
          <PublicRoute path='/admin-login' component={AdminLogin} />
          <ProtectedRoute
            path='/admin-profile'
            component={AdminDashboard}
            children={<AdminProfile />}
          />
          <ProtectedRoute path='/list/:id' component={EditListing} />
          <ProtectedRoute
            path='/admin-requests'
            component={AdminDashboard}
            children={<AdminRequests />}
          />
          <ProtectedRoute
            path='/admin-adminListing'
            component={AdminDashboard}
            children={<AdminListing />}
          />
          <ProtectedRoute
            path='/admin-dashboard'
            component={AdminDashboard}
            children={<Dashboard />}
          />

          {/* Customer Routes */}
          <Route path='/' exact component={LandingPage} />
          <Route path='/categories' component={CategoriesPage} exact />
          <Route path='/categories/:cat' component={CategoriesPage} exact />
          <Route path='/add-new-listing' component={AddListings} exact />
          <Route path='/categories-retail' component={CategoriesPage} exact />

          <Route path='/brands' component={Brands} exact />
        </LayoutWrapper>
      </Switch>
    </div>
  );
}

export default App;
