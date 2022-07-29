import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = useSelector((state) => state.auth);
  const auth = localStorage.getItem("admin");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn || auth ? (
          <>
            <Component {...props} children={children} />
          </>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
