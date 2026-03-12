import {Container, Logo} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Account } from '../index'
import { Home, CirclePlus,LogIn,LogOut,User, Bell } from 'lucide-react'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name:  `${<Home/>} Home`,
      slug: "/",
      active: true
    }, 
    {
      name: `${<LogIn/>}  LogIn`,
      slug: "/login",
      active: !authStatus,
  },
  {
      name: `${<User/>} SignUp`,
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: `${<CirclePlus/>}  Add-Post`,
      slug: "/add-post",
      active: authStatus,
  },
  {
    name: `${<Bell/>}`,
    slug: "/notification",
    active: authStatus,
  }
  ]

  return (
    <header className=''>
      <Container>
        <nav className=''>
          <div className=''>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className=''>
            {navItems.map(item => item.active ? (<li key={item.name}>
                                                    <button onClick={() => navigate(item.slug)} className=''>
                                                      {item.name}
                                                      </button>
                                                 </li>) : null )}
            {authStatus && (
              <li>
                <Account/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header