import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductChart from "../../global/ProductChart"
import PieChart1 from "../../global/PieChart1"
import AddressChart from "../../global/AddressChart"
import formatNumber from '../../utils/formatNum'

const Overall = () => {
  const dispatch = useDispatch()
  const guests = useSelector(state => state.global.guests)
  const totalGuests = guests.length
  let total = 0

  guests.forEach(item => {
    total += item.totalMoney
  })

  let avg = Math.floor(total / guests.length)

  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Tổng quan'
    })
  }, [])

  return (
    <div id='overall-tab'>
      <div className='overall-tab-container'>
        <div className='pie-chart-container'>
          <h5>Loại khách hàng (Tổng số KH: {totalGuests})</h5>
          <PieChart1 />
          <span style={{ background: '#E38627' }}>Đ.Biệt</span>
          <span style={{ background: '#C13C37' }}>VIP</span>
          <span style={{ background: '#6A2135' }}>T.Năng</span>
          <span style={{ background: '#6A2457' }}>V.Lai</span>
        </div>
        <div className='pie-chart-container'>
          <h5>Chi tiêu trung bình:</h5>
          <h1 style={{ color: 'red' }}>{formatNumber(avg)}đ</h1>
          <h5 style={{marginTop: 24}}>Tổng doanh thu:</h5>
          <h1 style={{ color: 'red' }}>{formatNumber(total)}đ</h1>
        </div>
        <div className='high-chart-container'>
          {/* <ProductChart /> */}
          <AddressChart />
        </div>
        <div className='high-chart-container'>
          <ProductChart />
        </div>
      </div>
    </div>
  )
}

export default Overall