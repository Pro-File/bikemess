import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.less";
import CategoriesPage from "./Containers/CategoiesPage/CategoriesPage";
import LandingPage from "./Containers/LandingPage/index";
import LayoutWrapper from "./Layout/LayoutWrapper";
import AddListings from "./Containers/AddListings";
import { db } from "./Services/firebaseConfig";
import { useDispatch } from "react-redux";
import { setAllListing } from "./Redux/Slices/AllListing";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchListings();
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

  return (
    <div>
      <Switch>
        <LayoutWrapper>
          <Route path="/" exact component={LandingPage} />
          <Route path="/categories" component={CategoriesPage} exact />
          <Route path="/categories/:cat" component={CategoriesPage} exact />
          <Route path="/add-new-listing" component={AddListings} exact />
          <Route path="/categories-retail" component={CategoriesPage} exact />
        </LayoutWrapper>
      </Switch>
    </div>
  );
}

export default App;
