import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// might want to modify this so its just a flat object keyed by ID
// with the parents, children etc of each object
// and just generate the graph at render
type TreeNode = {
  id: string;
  parent?: string; // probably need to make these ids
  children: string[];
  fileName: string;
  lineNumber?: number;
};

type AddNodeAction = {
  fileName: string;
  lineNumber?: number;
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
