import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import History from "./Components/History/History";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router history={History}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
