import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { Pages } from "./pages/Pages";
import { registerSW } from "virtual:pwa-register";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const updateSW = registerSW({
  onNeedRefresh() {
    Toastify({
      text: `<h4 style='display: inline'>An update is available!</h4>
             <br><br>
             <a class='do-sw-update'>Click to update and reload</a>  `,
      escapeMarkup: false,
      gravity: "bottom",
      onClick() {
        updateSW(true);
      },
    }).showToast();
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Pages />
  </Provider>,
  document.getElementById("root")
);
