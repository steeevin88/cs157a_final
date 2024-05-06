import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }
  return (
    <header className='header'>
        <div className='flex gap-2 logo'>
            <Link to='/'>GoalSetter</Link>|
            <Link to='/goals'>Goals</Link>|
            <Link to='/gyms'>Find Gyms</Link>|
            <Link to='/workouts'>Workouts</Link>|
            <Link to='/motivation'>Motivation Wall</Link>
        </div>
        <ul>
            { user ? (
                <li>
                    <button className='btn' onClick={ onLogout }>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            ) : (<> 
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </>) }
        </ul>
    </header>
  )
}

export default Header