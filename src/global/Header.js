import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const fullName = useSelector(state => state.global.user.fullName)
  const image = useSelector(state => state.global.user.userImage)
  const role = useSelector(state => state.global.user.role)
  const title = useSelector(state => state.global.title)

  return (
    <div id='header'>
      <div className='header-container'>
        <h1>{title}</h1>
        <div className='sign'>
          <div className='avt-wrapper'>
            <img src={image && image.url || '/images/user_default_img.png'}/>
          </div>
          <span>{`${fullName} (${role})`}</span>
          <button style={{zIndex: 10}}>
            <Link to='/login'>
              Đăng xuất
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header