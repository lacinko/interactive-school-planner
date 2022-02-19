import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { Pages } from "./pages/Pages";

ReactDOM.render(
  <Provider store={store}>
    <Pages />
  </Provider>,
  document.getElementById("root")
);
