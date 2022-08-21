import React from "react";
import type { RootState } from "./ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./TestReducer";

import "./App.css";

import logo from "./logo.svg";

export function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  let data = {
    name: "file 1",
    children: [{ name: "file 2" }, { name: "file 2" }],
  };

  let renderButton = function (button: any) {
    return (
      <div>
        <button>{button.name}</button>
        <div className="children"></div>
        {button.children.map((child: any) => {
          return renderButton(child);
        })}
      </div>
    );
  };

  let onButtonClick = function () {
    // @ts-ignore
    const vscode = acquireVsCodeApi(); // this needs to be moved to some global singleton or something
    vscode.postMessage({
      command: "tabSelected",
      text: "somet text",
    });

    dispatch(increment());
  };

  console.log("test log");

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Tree Tabs Hooks</h1>
        <button aria-label="Increment value" onClick={() => onButtonClick()}>
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </header>
    </div>
  );
}

export default App;
