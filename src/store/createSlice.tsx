import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, userData } from '../firebase/firebaseConfig'

type userInfo = {
    displayName: string | null,
    email: string | null
}

type InitialStateType = {
    userInfo: userInfo,
    data:string
}

const initialState: InitialStateType = {
    userInfo: {
        displayName: '',
        email: ''
    },
    data:''
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
        logoutUser: (state) => {
            state.userInfo={displayName:"", email:""}
        }
    }
})



export const { registerUser, logoutUser } = UserSlice.actions
export default UserSlice.reducer
