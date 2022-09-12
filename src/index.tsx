import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./ReduxStore";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import { addTab } from "./TreeReducer";

window.addEventListener("message", (event) => {
  const message = event.data;

  switch (message.command) {
    case "addTab":
      store.dispatch(addTab(message));
      break;
    default:
      break;
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />{" "}
  </Provider>,
  document.getElementById("root") as HTMLElement
);
