import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className='max-w-[90%] mx-auto px-2 py-3 h-[40px] '>
      <div className='flex items-center justify-between '>
        <img src={logo} alt="" className=' object-cover' />
        <div className='flex items-center gap-1'>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>

    </header >
  )
}

export default Header