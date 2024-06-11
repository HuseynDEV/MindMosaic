import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from 'zod'
import { signIn } from "../auth/api"
import { useMutation } from "@tanstack/react-query"
const Login = () => {

  const navigate = useNavigate()

  const typeSchema = z.object({
    email: z.string({
      required_error: "Email is required"
    }).email(),
    password: z.string({
      required_error: "Password is required"
    }).min(6, { message: "Must be 6 or more characters long" }).refine(data => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).test(data), {
      message: "Password bunlardan olmalidir"
    })
  })

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    resolver: zodResolver(typeSchema)
  })

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      console.log('success')
      navigate("/")
    }
  })

  const onSubmit = () => {
    const { email, password } = getValues()
    mutation.mutateAsync({ email, password })
    reset()
  }

  const { isPending } = mutation
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {isPending ? <h1>Loading...</h1> : (
        <div className="w-[500px] h-[300px] shadow-2xl  p-4 ">
          <h1 className="text-center text-2xl">Sign In</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="">Email</label>
              <input {...register("email")} type="email" className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
              {errors.email && (
                <p className="text-red-600 text-sm">{`${errors.email.message}`}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input {...register('password')} type="password" className="h-[40px] w-full p-3 mb-2 border-2 outline-none" />
              {errors.password && (
                <p className="text-red-600 text-sm">{`${errors.password.message}`}</p>
              )}
            </div>
            <button type="submit" className="w-full h-[40px] bg-black text-white rounded-md mt-4">Sign In</button>
            <div className="text-center mt-3">Do you haven't account <Link to='/auth/register' className="text-blue-600">Sign Up</Link> </div>

          </form>
        </div>
      )}

    </div>
  )
}

export default Login