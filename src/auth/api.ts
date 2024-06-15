import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { userSignInType, userSignUpType } from "../types/types"
import { auth } from '../firebase/firebaseConfig'

export const signUp = async ({ username, email, password }: userSignUpType) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, { displayName: username })
    const accessToken = await user.getIdToken()
    return { user, accessToken }
}


export const signIn = async ({ email, password }: userSignInType) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    const accessToken = await user.getIdToken()
    return { user, accessToken }

}