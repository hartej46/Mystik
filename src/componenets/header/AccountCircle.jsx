import React from 'react'
import {Container} from '../index'

function AccountCircle() {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  return (
    <div>
      <Container>
          <button 
            onClick={() => setDropDownOpen(!dropdownOpen)} 
            className='account-btn'
          >
          <span className='avatar-icon'>
            
          </span> 
        </button>
        {dropdownOpen && (
          <div className='menu'>
            <div className='item'>View Profile</div>
            <div className='divider'></div>
            <div className='item'>Settings</div>
            <div className='item'>Logout</div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AccountCircle