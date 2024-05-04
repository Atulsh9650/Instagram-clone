import { createSlice } from "@reduxjs/toolkit";

const initialState={
  userdata:{}
}
const userSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    loginsuccess: (state, action) => {
      return {
        ...state,
        userdata: action.payload,
      };
    },
    loginfailed: (state) => {
      return initialState // Modify draft state
    }
  },
});


export const { loginsuccess, loginfailed } = userSlice.actions;

export default userSlice;
