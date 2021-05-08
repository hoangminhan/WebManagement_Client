import { useEffect, useState } from "react"
import SideBar from "../global/SideBar"
import MainContent from "./MainContent"
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const MainLayout = ({ children }) => {
  const history = useHistory()
  const accessToken = localStorage.getItem('accessToken')
  
  const [mbSide, setMbSide] = useState(true)

  useEffect(() => {
    if (!accessToken) return history.push('/login')
  }, [accessToken])

  return (
    <div id='main-layout'>
      <div className='row no-gutters'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'>
          <div className={!mbSide && 'side__bar-container' || 'side__bar-container active'}>
            <button onClick={() => setMbSide(!mbSide)}>
              {
                !mbSide &&
                < i className="fas fa-caret-right"></i>
                ||
                <i className="fas fa-caret-left"></i>
              }
            </button>
            <SideBar />
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9'>
          <div className='main-content-container'>
            <MainContent />
          </div>
        </div>
      </div>
    </div >
  )
}

export default MainLayout