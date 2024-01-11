import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CallDTO } from 'src/types/dto';

export interface currentCallState {
  selectedCall: CallDTO | null,
  callLogs: CallDTO[]
}


const initialState: currentCallState = {
  selectedCall: null,
  callLogs : []
};

export const currentCallSlice = createSlice({
  name: 'currentCall',
  initialState,
  reducers: {

    setCurrentCall: (state , action: PayloadAction<CallDTO>) => {
      state.selectedCall = action.payload;
    },

    setCallLogs: (state , action: PayloadAction<CallDTO[]>) => {
      state.callLogs = action.payload;
      state.callLogs = state.callLogs.reverse();
    },

    addCallLogItem: (state , action: PayloadAction<CallDTO>) => {
      state.callLogs.unshift(action.payload);
    }


  },
});

export const { setCurrentCall , setCallLogs , addCallLogItem } = currentCallSlice.actions;
export default currentCallSlice.reducer;