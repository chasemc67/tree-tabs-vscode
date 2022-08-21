import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./ReduxStore";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import { increment } from "./TestReducer";

window.addEventListener("message", (event) => {
  console.log("========== recieved message");
  const message = event.data;

  switch (message.command) {
    case "addChild":
      console.log("====== message command was addChild");
      store.dispatch(increment());
      break;
    case "addSibling":
      console.log("====== message command was addSibling");
      break;
    case "addParent":
      console.log("====== message command was addParent");
      break;
    case "addRoot":
      console.log("====== message command was addRoot");
      break;
    default:
      console.log("==== recieved message with unknown command");
      break;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.getElementById("root") as HTMLElement
);
