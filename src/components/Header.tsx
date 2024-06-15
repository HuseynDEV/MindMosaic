import logo from '../assets/logo.png'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { fetchUser } from '../store/authSlice'
import { Link } from 'react-router-dom'

const Header = () => {

  const state=useAppSelector(state=>state.auth)
  const dispatch=useAppDispatch()

const getFirstLetter=()=>{
  return state.user.name?.split('')[0]
}
  
useEffect(()=>{
dispatch(fetchUser())
},[])
  return (
    <header className=' mx-auto px-10 py-3  shadow-md '>
      <div className='flex items-center justify-between '>
        <div className='flex items-center gap-3'>
          <img src={logo} alt="" className=' object-cover' />
          <input type="text" placeholder='Search...' className=' ml-5 px-2 w-[300px] h-[35px] border-[1px] border-gray-300 outline-none rounded-md' />
        </div>
        <div className='flex items-center gap-2'>
          {state.user.name ? (<>
            <Link to='/auth/register' className='bg-black text-white px-3 py-2 rounded-md'>Create Blog</Link>
            <div className='relative cursor-pointer'  >
              <div className='text-xl bg-black text-white w-[40px] rounded-full flex items-center justify-center h-[40px]' >{getFirstLetter()}</div>

              {/* <div onClick={() => setSubMenu(!subMenu)} className='w-[40px] rounded-full h-[40px] flex items-center justify-center bg-black text-white'>{getFirstLetter()}</div>
              {subMenu && (
                <div className='absolute top-[100%] bg-white right-0 mt-2 border-2 flex flex-col p-2 gap-2 w-[200px]'>
                  <div className='flex items-center gap-2'><User className='w-[20px]' /> <span className='text-sm'>Profile</span> </div>
                  <div onClick={logout} className='flex items-center gap-2'> <LogOut className='w-[20px]' /> <span className='text-sm'>Logout</span> </div>
                </div>
              )} */}
            </div>
          </>) :
            <><Link to='/auth/register' type='button' className='bg-black text-white px-3 py-2 rounded-md'>Register</Link>
              <Link to='/auth/login'  type='button' className='px-3 py-2'>Login</Link></>}
        </div>
      </div>

    </header >
  )
}

export default Header





   // signOut(auth).then(() => {
            //     console.log('success')
            //     // navigate('/auth/login')
            //     console.log(state.userInfo, 'awdawdadwadaw')
          
            //   }).catch((err) => {
            //     console.log(err)
            //   })