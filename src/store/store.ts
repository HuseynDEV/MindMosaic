import { configureStore } from "@reduxjs/toolkit"
import { UserSlice } from "./createSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"



export const store = configureStore({
    reducer: {
        user: UserSlice.reducer
    }
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector