import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import loggedinSlice from "./loggedinSlice";


export const mainstore=configureStore({
    reducer:{
        user:userSlice.reducer,
        logstatus:loggedinSlice.reducer
    }
});