import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    value: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,      
    reducers: {
        setUserName: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setUserName } = userSlice.actions;
const userReducer = userSlice.reducer; 
export default userReducer;