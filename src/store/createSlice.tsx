import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, userData } from '../firebase/firebaseConfig'

type userInfo = {
    displayName: string | null,
    email: string | null
}

type InitialStateType = {
    userInfo: userInfo
}

const initialState: InitialStateType = {
    userInfo: {
        displayName: 'awdawda',
        email: 'awdawd'
    }
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: { 
        registerUser: (state, action: PayloadAction<{ user: userInfo, id: string }>) => {
            console.log(action.payload.user, 'user');
            localStorage.setItem('accessToken', action.payload.id);
            state.userInfo = action.payload.user; // Direct mutation
        },
        

        // fetchUser: (state) => {
        //     // Ensure that fetchUser updates the state correctly
        //     console.log(state.userInfo, 'statee');
        //     return state;
        // }
    }
})


export default UserSlice.reducer

export const { registerUser } = UserSlice.actions
