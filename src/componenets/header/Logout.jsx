import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/Auth'
import {logout} from  '../../store/authSlice'
import { button } from 'framer-motion/client'

function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='btn' onSubmit={logoutHandler}>
        Sign out
    </button>
  )
}

export default Logout