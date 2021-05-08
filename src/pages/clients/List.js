import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from '../../global/Pagination'
import Warning from '../../global/Warning'
import { getAllGuestsAsync, removeGuestAsync } from '../../redux/actions'
import getMedal from '../../utils/getMedal'
const ClientList = ({ setClientInfo, setUpdateForm, setProduct }) => {
  const guests = useSelector(state => state.global.guests)
  const guestPage = useSelector(state => state.global.guestPage)

  const dispatch = useDispatch()

  const deleteGuest = (_id) => {
    dispatch(removeGuestAsync(_id))
  }

  const changePage = (page) => {
    dispatch(getAllGuestsAsync({ page }))
  }

  return (
    <div id='client-list'>
      <div className='client-list-container'>
        {
          guests && guests.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='info'>
                <span>Họ Tên</span>
                <span>Loại KH</span>
                <span>Quận/Huyện</span>
              </div>
              <div className='tools'>
                <span>Thêm SP</span>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              guests.map((item, index) => {
                if (index < 10) return (
                  <li key={item._id}>
                    <div className='info'>
                      <span className='name' onClick={() => setClientInfo({ status: true, info: item })}>
                        {item.fullName}
                      </span>
                      <span style={{ fontWeight: 'bold' }}>{getMedal(item.totalMoney)}</span>
                      <span>{item.address && item.address.name || <strong style={{ color: 'red' }}>Chưa cập nhật</strong>}</span>
                    </div>
                    <div className='tools'>
                      <button onClick={() => { setProduct({ user: item, status: true }) }} className='add'>
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item })}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => deleteGuest(item._id)} className='remove'>
                        <i className="fas fa-user-times"></i>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có khách hàng nào!' />
        }
      </div>
      {
        guestPage.totalPage > 1 &&
        <div className='client-pagination'>
          <Pagination totalPage={guestPage.totalPage} currentPage={guestPage.currentPage} changePage={changePage} />
        </div>
      }
    </div>
  )
}

export default ClientList