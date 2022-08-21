import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./ReduxStore";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import { addChild, addSibling, addParent, addRoot } from "./TreeReducer";

window.addEventListener("message", (event) => {
  const message = event.data;

  switch (message.command) {
    case "addChild":
      store.dispatch(addChild());
      break;
    case "addSibling":
      store.dispatch(addSibling());
      break;
    case "addParent":
      store.dispatch(addParent());
      break;
    case "addRoot":
      console.log(`====== dispatching message: ${JSON.stringify(message)}`);
      store.dispatch(addRoot(message));
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
