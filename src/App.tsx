import React from "react";
import type { RootState } from "./ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import { VSCodeApiGetter } from "./VSCodeApiGetter";

import "./App.css";

export function App() {
  const rootNodes = useSelector((state: RootState) => state.Trees.nodes);
  // const dispatch = useDispatch();

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

  let onButtonClick = function (fileName: string, lineNumber?: number) {
    // @ts-ignore
    const vscode = VSCodeApiGetter.getVsCodeApi(); // this needs to be moved to some global singleton or something
    vscode.postMessage({
      command: "tabSelected",
      fileName,
      lineNumber,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Tree Tabs Hooks</h1>
        {rootNodes.map((node) => {
          let name = `${node.fileName}:${
            node.lineNumber !== undefined && node.lineNumber + 1
          }`; // add 1 to lineNumber to match UI gutter because they're 0-indexed internally
          return (
            <button
              aria-label={name}
              onClick={() => onButtonClick(node.fileName, node.lineNumber)}
            >
              {name}
            </button>
          );
        })}
      </header>
    </div>
  );
}

export default App;
