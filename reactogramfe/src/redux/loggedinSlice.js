import { createSlice } from "@reduxjs/toolkit";

const loggedinSlice=createSlice({
    name:'logstatus',
    initialState:{
        isloggedin:false
    },
    reducers:{
        marklogdone:(state)=>{
            state.isloggedin =true;
        },
        marklogout:(state)=>{
            state.isloggedin =false;
        }
    }
});

export const loggedinActions=loggedinSlice.actions;

export default loggedinSlice;