import {Container, Logout, AccountCircle} from '../index'
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

function Account() {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  return (
    <div>
      <Container>
          <button 
            onClick={() => setDropDownOpen(!dropdownOpen)} 
            className='account-btn'
          >
          <span className='avatar-icon'>
            <div className='circle'>
             <AccountCircle />
            </div>
          </span> 
        </button>
        {dropdownOpen && (
          <div className='menu'>
            <div className='item'>
              <Link to='/profile'>
                <div><AccountCircle /></div>
                <div>Anonymous</div>
              </Link>
            </div>
            <div className='divider'></div>
            <div className='item'><Link to='/setting'><Settings />Setting</Link></div>
            <div className='item'><Logout/></div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Account