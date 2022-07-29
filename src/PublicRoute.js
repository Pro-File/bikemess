import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = useSelector((state) => state.auth);
  const auth = localStorage.getItem("admin");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn || auth ? (
          <>
            <Redirect
              to={{
                pathname: "/admin-dashboard",
                state: { from: props.location },
              }}
            />
          </>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
