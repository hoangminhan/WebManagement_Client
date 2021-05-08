import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../global/Pagination"
import Warning from "../../global/Warning"
import { getAllUsersAsync, removeUsersAsync } from "../../redux/actions"

const StaffList = ({ setUpdateForm }) => {
  const staffs = useSelector(state => state.global.users)
  const userPage = useSelector(state => state.global.userPage)
  const userId = useSelector(state => state.global.user._id)
  const role = useSelector(state => state.global.user.role)
  const dispatch = useDispatch()

  const deleteUser = (_id, image) => {
    dispatch(removeUsersAsync(_id, image))
  }

  const changePage = (page) => {
    dispatch(getAllUsersAsync({page}))
  }
  
  return (
    <div id='staff-list'>
      <div className='staff-list-container'>
        <h4>Danh sách nhân viên: </h4>
        {
          staffs && staffs.length > 0 &&
          <ul>
            {
              staffs.map((item, key) =>
                <li style={{ background: userId === item._id && 'rgba(40, 44, 253, 0.37)' }} key={item._id}>
                  <div className='count'>
                    <span>{key + 1}</span>
                  </div>
                  <div className='info'>
                    <div className='avt-wrapper'>
                      <img src={item.image && item.image.url || '/images/user_default_img.png'} />
                    </div>
                    <span>{item.fullName}</span>
                  </div>
                  <div className='detail'>
                    <div className='phone'>
                      <strong>SĐT: </strong>
                      <span>{item.phone}</span>
                    </div>
                    <div className='address'>
                      <strong>Địa chỉ: </strong>
                      <span>{item.address}</span>
                    </div>
                    <div className='email'>
                      <strong>Email: </strong>
                      <span>{item.email}</span>
                    </div>
                    {
                      role === 'admin' &&
                      <div style={{ color: 'red' }} className='account'>
                        <strong>Tài khoản: </strong>
                        <span>{item.username}</span>
                        <span> - </span>
                        <span>{item.password}</span>
                      </div>
                    }
                  </div>
                  <div className='tools'>
                    {
                      (role === 'admin' || userId === item._id) &&
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item })} >
                        <i className="fas fa-edit"></i>
                      </button>
                    }
                    {
                      role === 'admin' &&
                      <button className='remove' onClick={() => deleteUser(item._id, item.image)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    }
                  </div>
                </li>
              )
            }
          </ul>
          ||
          <Warning alert='Chưa có nhân viên!' />
        }
      </div>
      <div className='staff-pagination'>
        <Pagination totalPage={userPage.totalPage} currentPage={userPage.currentPage} changePage={changePage} />
      </div>
    </div>
  )
}

export default StaffList