import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountTypeID, storeType, UserType } from "../types/types";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Cookies from "universal-cookie";
import { onAuthStateChanged } from "firebase/auth";

type DataType = {
    displayName: string | null;
    email: string | null;
};

const cookies = new Cookies();
const initialState: storeType = {
    user: {
        name: "",
        email: ""
    },
    loading: false,
    error: false
};

export const signUp = createAsyncThunk<
    accountTypeID,
    { username: string; email: string; password: string; navigate: (path: string) => void },
    { rejectValue: string }
>('auth/signUp', async ({ username, email, password, navigate }, { rejectWithValue }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        const accessToken = await user.getIdToken();
        console.log("success");
        navigate('/auth/login');
        return { user: { displayName: user.displayName, email: user.email }, accessToken } as accountTypeID;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const signIn = createAsyncThunk<
    accountTypeID,
    { email: string; password: string; navigate: (path: string) => void },
    { rejectValue: string }
>('auth/signIn', async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const accessToken = await user.getIdToken();
        navigate('/');
        return { user: { displayName: user.displayName, email: user.email }, accessToken } as accountTypeID;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});




export const fetchUser = createAsyncThunk<DataType, void, { rejectValue: string }>('fetchUser', async (_, { rejectWithValue }) => {
    try {
        const token = cookies.get('accessToken');

        if (!token) {
            return rejectWithValue('Token is missing');
        }

        const getUserData = async (): Promise<DataType | null> => {
            return new Promise<DataType | null>((resolve, reject) => {
                onAuthStateChanged(auth, (userData) => {
                    if (userData) {
                        console.log(userData, auth)
                        const data: DataType = {
                            displayName: userData.displayName,
                            email: userData.email
                        };
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                }, (error) => {
                    reject(error);
                });
            });
        };

        const userData = await getUserData();
        if (userData) {
            return userData;
        } else {
            return rejectWithValue('No user data available');
        }
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});



const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<accountTypeID>) => {
                state.user = {
                    name: action.payload.user.displayName,
                    email: action.payload.user.email,
                };
                state.loading = false;
                state.error = false;
            })
            .addCase(signUp.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<accountTypeID>) => {
                state.user = {
                    name: action.payload.user.displayName,
                    email: action.payload.user.email,
                };
                cookies.set('accessToken', action.payload.accessToken, {
                    path: '/'
                });
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<DataType>) => {
                if (action.payload) {
                    console.log(action.payload)
                    state.user = {
                        name: action.payload.displayName,
                        email: action.payload.email,
                    };
                }
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    },
});

export default authSlice.reducer;
