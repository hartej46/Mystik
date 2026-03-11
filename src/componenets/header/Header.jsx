import {Container, Logo} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AccountCircle } from '../index'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
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
                <AccountCircle/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header