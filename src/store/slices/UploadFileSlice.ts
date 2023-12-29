import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface uploadFileState {
    files : string[]
}

const initialState: uploadFileState = {
  files: [],
};

export const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {

    addFile: (state , action: PayloadAction<string>) => {
      state.files.push(action.payload);
    },

    resetFile: (state) => {
      state.files = [];
    }

  },
});

export const { addFile , resetFile } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;