
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { signUp } from "../auth/api"
import { useMutation } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../store/store"
import { registerUser } from "../store/createSlice"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"



const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)
    const [passwordType, setPasswordType] = useState<string>('password')
    const [confirmPasswordType, setconfirmPasswordType] = useState<string>('password')


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const person = useAppSelector(state => state.user.userInfo)

    const typeSchema = z.object({
        username: z.string({
            required_error: 'Name is required'
        }).min(4, { message: "Must be 4 or more characters long" }),
        email: z.string({
            required_error: "Email is required"
        }).email(),
        password: z.string({
            required_error: "Password is required"
        }).min(6, { message: "Must be 6 or more characters long" }).refine(data => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).test(data), {
            message: "Password bunlardan olmalidir"
        }),
        confirmPassword: z.string().refine((data) => data == getValues().password, {
            message: "Password must be match"
        })
    })

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            const { displayName, email } = data.user
            console.log(data.accessToken, 'data')
            dispatch(registerUser({ id: data.accessToken, user: { displayName, email } }))
            console.log(data.user, 'person', data.accessToken)
            navigate("/")
        }
    })

    const onSubmit = () => {
        const { username, email, password } = getValues()
        signUp({ username, email, password })
        mutation.mutate({ username, email, password })
        reset()
    }

    const { isPending } = mutation


    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues } = useForm({
            resolver: zodResolver(typeSchema)
        })


    const handleShowPassword = () => {
        setShowPassword(item => !item)
        setPasswordType(showPassword ? "text" : 'password')
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(item => !item)
        setconfirmPasswordType(confirmPasswordType ? "text" : "password")
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {isPending ? <h1 className="text-3xl">Loading</h1> : (
                <div className="w-[500px] h-[500px] shadow-2xl  p-4 ">
                    <h1 className="text-center text-2xl">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col mt-4">
                        <div className="mb-2 w-full">
                            <input {...register("username")} type='text' placeholder="Name..." className="h-[40px] w-full p-3  border-2 outline-none" />
                            {errors.username &&
                                (<p className="text-red-600 text-sm">{`${errors.username.message}`}</p>)
                            }
                        </div>
                        <div className="w-full">
                            <input {...register("email")} type='email' placeholder="Email..." className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{`${errors.email.message}`}</p>
                            )}
                        </div>
                        <div className="relative w-full">
                            <input   {...register("password")} type={passwordType} placeholder="Password..." className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
                            {errors.password && (
                                <p className="text-red-600 text-sm">{`${errors.password.message}`}</p>
                            )}
                            <div className="absolute top-[40%] -translate-y-[50%] right-2" onClick={handleShowPassword}> {showPassword ? <Eye /> : <EyeOff />} </div>
                        </div>
                        <div className="w-full relative">
                            <input  {...register('confirmPassword')} type={confirmPasswordType} placeholder="ConfirmPassword..." className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-sm">{`${errors.confirmPassword.message}`}</p>
                            )}
                            <div className="absolute top-[40%] -translate-y-[50%] right-2" onClick={handleShowConfirmPassword}> {showConfirmPassword ? <Eye /> : <EyeOff />} </div>

                        </div>
                        <button type="submit" className="w-full h-[40px] bg-black text-white rounded-md mt-4">Sign Up</button>
                        <div className="text-center mt-3">Already have a account? <Link to='/auth/login' className="text-blue-600">Sign In</Link> </div>
                    </form>
                </div>

            )}

        </div>
    )
}

export default Register