import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TreeNode = {
  id: string;
  parent?: string; // probably need to make these ids
  children: string[];
  fileName: string;
  lineNumber: string;
};

type AddNodeAction = {
  fileName: string;
  lineNumber: string;
};

export interface TreeState {
  nodes: TreeNode[];
}

const initialState: TreeState = {
  nodes: [],
};

export const treeSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    addChild: (state) => {},
    addSibling: (state) => {},
    addParent: (state) => {},
    addRoot: (state, action: PayloadAction<AddNodeAction>) => {
      console.log(`====== evaluating action: ${JSON.stringify(action)}`);
      let newNode = {
        id: action.payload.fileName,
        children: [],
        fileName: action.payload.fileName,
        lineNumber: action.payload.lineNumber,
      };
      state.nodes.push(newNode);
    },
  },
});

export const { addChild, addSibling, addParent, addRoot } = treeSlice.actions;

export default treeSlice.reducer;
