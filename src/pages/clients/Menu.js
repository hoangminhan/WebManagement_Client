import { useState } from "react"
import { useDispatch } from "react-redux"
import { getAllGuestsAsync } from "../../redux/actions"
import toChar from "../../utils/toChar"

const ClientMenu = ({ setCreateForm }) => {
  const dispatch = useDispatch()

  const [query, setQuery] = useState({})

  const filerByCategory = (e) => {
    const value = e.target.value && JSON.parse(e.target.value)
    const { start, end } = value
    setQuery({...query, start, end})

    dispatch(getAllGuestsAsync({...query, start, end}))
  }

  const filterByCmnd = (e) => {
    const value = e.target.value
    setQuery({...query, cmnd: value})

    dispatch(getAllGuestsAsync({...query, cmnd: value}))
  }

  const filterByName = (e) => {
    const value = e.target.value
    setQuery({...query, search: toChar(value)})

    dispatch(getAllGuestsAsync({...query, search: toChar(value)}))
  }

  return (
    <div id='client-menu'>
      <div className='client-menu-container'>
        <ul>
          <li className='add'>
            <button onClick={() => setCreateForm(true)}>
              <i className="fas fa-plus"></i>
              <span>
                Thêm khách hàng
              </span>
            </button>
          </li>
          <li className='name'>
            <label htmlFor='name'>
              Tên
            </label>
            <input onChange={filterByName} id='name' placeholder='Nhập tên khách hàng...' />
          </li>
          <li className='id'>
            <label htmlFor='id'>
              CMND
            </label>
            <input onChange={filterByCmnd} id='id' placeholder='Nhập số cmnd...' />
          </li>
          <li className='category'>
            <select onChange={filerByCategory}>
              <option value={JSON.stringify({start: null, end: null})} selected >Tất cả</option>
              <option value={JSON.stringify({ start: 0, end: 5000000 })} >Vãng lai</option>
              <option value={JSON.stringify({ start: 5000000, end: 10000000 })} >Tiềm năng</option>
              <option value={JSON.stringify({ start: 10000000, end: 50000000 })} >VIP</option>
              <option value={JSON.stringify({ start: 50000000, end: 50000000000000000 })} >Đặc biệt</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ClientMenu