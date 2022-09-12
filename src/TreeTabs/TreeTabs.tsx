import React, { useState } from "react";
import type { RootState } from "../ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import { VSCodeApiGetter } from "../VSCodeApiGetter";
import "./TreeTabs.css";
import { TreeNode, closeTab } from "../TreeReducer";

function Tab(props: { name: string; closeTab: any; onClick: any }) {
  const [elPosition, setElPosition] = useState({ top: 5, left: 5 });
  const [hasMoved, setHasMoved] = useState(false);
  let cursorOffset = {
    x: 0,
    y: 0,
  };

  const handleDragStart = (e: any) => {
    cursorOffset = {
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    };

    // set CSS
    e.currentTarget.style.opacity = 0.3;

    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnd = (e: any) => {
    e.preventDefault();
    e.currentTarget.style.opacity = 1;
    setElPosition({
      left: e.clientX - cursorOffset.x,
      top: e.clientY - cursorOffset.y,
    });
    setHasMoved(true);
  };

  const handleDagOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
  };

  const getStyle = () => {
    return elPosition;
  };

  return (
    <div
      className={hasMoved ? "tree-tab" : "tree-tab-new"}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={handleDagOver}
      style={getStyle()}
    >
      <button onClick={props.onClick}>{props.name}</button>
      <button
        className="tab-close-button"
        onClick={(e) => props.closeTab(props.name)}
      >
        X
      </button>
    </div>
  );
}

function TreeTabs() {
  const rootNodes = useSelector((state: RootState) => state.Trees.nodes);
  const dispatch = useDispatch();

  let onButtonClick = function (fileName: string, lineNumber?: number) {
    // @ts-ignore
    const vscode = VSCodeApiGetter.getVsCodeApi();
    vscode.postMessage({
      command: "tabSelected",
      fileName,
      lineNumber,
    });
  };

  const onCloseTab = (nodeId: string) => {
    dispatch(closeTab({ nodeId: nodeId }));
  };

  const getNameForNode = (node: TreeNode) => {
    return `${node.fileName.split("/").pop()}:${
      node.lineNumber !== undefined && node.lineNumber + 1
    }`;
  };

  const getKeyForNode = (node: TreeNode) => {
    return node.id;
  };

  return (
    <div>
      <div
        className="tree-tabs-root"
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {rootNodes.map((node) => (
          <Tab
            key={getKeyForNode(node)}
            name={getNameForNode(node)}
            onClick={() => onButtonClick(node.fileName, node.lineNumber)}
            closeTab={() => onCloseTab(node.id)}
          ></Tab>
        ))}
      </div>
    </div>
  );
}

export default TreeTabs;
