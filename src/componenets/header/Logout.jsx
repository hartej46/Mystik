import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/Auth'
import {logout} from  '../../store/authSlice'
import { LogOut } from 'lucide-react'


function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='btn' onSubmit={logoutHandler}>
       <LogOut/> Sign out
    </button>
  )
}

export default Logout