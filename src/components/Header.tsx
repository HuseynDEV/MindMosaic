import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAppSelector, useAppDispatch } from '../store/store'
import { useEffect, useRef, useState } from 'react'
import { registerUser } from '../store/createSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, } from '../firebase/firebaseConfig'

const Header = () => {
  const state = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<boolean>(false)
  const [subMenu, setSubMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)


  const token = localStorage.getItem('accessToken')
  let getFirstLetter = () => {
    return state.userInfo.displayName && state.userInfo.displayName.split("")[0]
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setSubMenu(false);
    }
  };


  useEffect(() => {

    if (token) {

      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          dispatch(
            registerUser({ user: { displayName: userData.displayName, email: userData.email }, id: token }),
            setUser(true),
          )
        }
      })
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])
  return (
    <header className='max-w-[90%] mx-auto px-2 py-3 h-[40px] '>
      <div className='flex items-center justify-between '>

        <div className='flex items-center gap-3'>
          <img src={logo} alt="" className=' object-cover' />
          <input type="text" placeholder='Search...' className=' ml-5 px-2 w-[300px] h-[35px] border-[1px] border-gray-300 outline-none rounded-md' />
        </div>
        <div className='flex items-center gap-2'>

          {user ? (<>
            <Link to='/auth/register' className='bg-black text-white px-3 py-2 rounded-md'>Create Blog</Link>
            <div className='relative' ref={menuRef} >

              <div onClick={() => setSubMenu(!subMenu)} className='w-[40px] rounded-full h-[40px] flex items-center justify-center bg-black text-white'>{getFirstLetter()}</div>
              {subMenu && (
                <div className='absolute top-[100%] right-0 mt-2 border-2 flex flex-col p-2 gap-2 w-[200px]'>
                  <div>Profile</div>
                  <div>Logout</div>
                </div>
              )}
            </div>
          </>) :
            <><Link to='/auth/register' type='button' className='bg-black text-white px-3 py-2 rounded-md'>Register</Link>
              <Link to='/auth/login' type='button' className='px-3 py-2'>Login</Link></>}
        </div>
      </div>

    </header >
  )
}

export default Header



