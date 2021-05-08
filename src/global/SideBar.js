import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const SideBar = () => {
  const menu = useSelector(state => state.global.menu)
  const location = useLocation()
  const asPath = location.pathname || '/'

  return (
    <div id='side-bar'>
      <div className='side-container'>
        <div className='logo'>
          <a href='/'>
            <img src='/images/logo.png' />
          </a>
        </div>
        <ul>
          {
            menu.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  {item.icon}                  
                  {item.title.toUpperCase()}
                </Link>
                <span className={(item.path === asPath) && 'active'}></span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default SideBar