import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editorRoomId: "",
  collaboratorName: "",
  numberOfCollaborators: 0,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorRoomId: (state, action) => {
      state.editorRoomId = action.payload;
    },

    setCollaboratorName: (state, action) => {
      state.collaboratorName = action.payload;
    },

    setNumberOfCollaborators: (state, action) => {
      state.numberOfCollaborators += action.payload;
    },
  },
});

export const {
  setEditorRoomId,
  setCollaboratorName,
  setNumberOfCollaborators,
} = editorSlice.actions;

export default editorSlice.reducer;
