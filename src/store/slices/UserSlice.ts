import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserAdditionalData } from 'src/types/dto';

export interface UserState {
  userData: UserData | null;
  additionalData : UserAdditionalData | null;
}

export interface UserData {
  email :string | null;
  displayName: string;
  photoURL: string;
  uid: string;
  phoneNumber : string;
}


const initialState: UserState = {
  userData: null,
  additionalData : null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state , action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },

    setUserAdditionalData: (state , action: PayloadAction<UserAdditionalData | null>) => {
      state.additionalData = action.payload;
    }

  },
});

export const { setUser , setUserAdditionalData } = userSlice.actions;
export default userSlice.reducer;