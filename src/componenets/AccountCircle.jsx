import authService from '../Appwrite/config'

function AccountCircle({ width = "70px", height = "70px" }) {
  return (
    <div className='circle'>
        <img src={authService.getCurrentUserAvatar()} alt="" width={width} height={height}/>
    </div>
  )
}

export default AccountCircle