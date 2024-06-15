
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/store"
import { signUp } from "../store/authSlice"


const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const state=useAppSelector(state=>state.auth)


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


    const onSubmit = () => {
        const { username, email, password } = getValues()
        dispatch(signUp({ username, email, password, navigate }))
        reset()
    }



    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues } = useForm({
            resolver: zodResolver(typeSchema)
        })


    const handleShowPassword = () => {
        setShowPassword(item => !item)
    }



    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[500px] h-[500px] shadow-2xl  p-4 ">
                {state.loading && <h1>loading</h1>}
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
                        <input   {...register("password")} type={showPassword ? 'text' : 'password'} placeholder="Password..." className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
                        {errors.password && (
                            <p className="text-red-600 text-sm">{`${errors.password.message}`}</p>
                        )}
                        <div className="absolute top-[40%] -translate-y-[50%] right-2" onClick={handleShowPassword}> {showPassword ? <Eye /> : <EyeOff />} </div>
                    </div>
                    <div className="w-full relative">
                        <input  {...register('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="ConfirmPassword..." className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{`${errors.confirmPassword.message}`}</p>
                        )}

                    </div>
                    <button type="submit" className="w-full h-[40px] bg-black text-white rounded-md mt-4">Sign Up</button>
                    <div className="text-center mt-3">Already have a account? <Link to='/auth/login' className="text-blue-600">Sign In</Link> </div>
                </form>
            </div>


        </div>
    )
}

export default Register