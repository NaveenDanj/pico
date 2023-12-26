import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CallDTO } from 'src/types/dto';

export interface currentCallState {
    selectedCall: CallDTO | null
}


const initialState: currentCallState = {
  selectedCall: null,
};

export const currentCallSlice = createSlice({
  name: 'currentCall',
  initialState,
  reducers: {

    setCurrentCall: (state , action: PayloadAction<CallDTO>) => {
      state.selectedCall = action.payload;
    },

  },
});

export const { setCurrentCall } = currentCallSlice.actions;
export default currentCallSlice.reducer;