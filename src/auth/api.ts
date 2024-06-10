import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { userSignUpType } from "../types/types"
import { auth } from '../firebase/firebaseConfig'

export const signUp = async ({ username, email, password }: userSignUpType) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, {displayName:username})
    const accessToken = await user.getIdToken()
    return { user, accessToken }
}