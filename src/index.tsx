import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./ReduxStore";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

window.addEventListener("message", (event) => {
  console.log("========== recieved message");
  const message = event.data;

  switch (message.command) {
    case "RightClick":
      console.log("====== message command was right-click");
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.getElementById("root") as HTMLElement
);
