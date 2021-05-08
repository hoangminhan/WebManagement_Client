import { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGuestsAsync, toggleLoading } from '../../redux/actions'
import { createGuest } from '../../services/global'
import toChar from '../../utils/toChar'

const Create = ({ status, setCreateForm }) => {
  const history = useHistory()

  const login = useSelector(state => state.global.login)
  const dispatch = useDispatch()

  const countries = useSelector(state => state.global.countries)

  const nameEl = useRef(null)
  const idEl = useRef(null)
  const phoneEl = useRef(null)
  const addEl = useRef(null)

  useEffect(() => {
    // if (!login) {
    //   setTimeout(() => {
    //     history.replace('/login')
    //   }, 1000)
    // }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const id = idEl.current.value.trim()
    const phone = phoneEl.current.value.trim()
    const address = addEl.current.value !== 'Quận/Huyện' && JSON.parse(addEl.current.value) || null
    const text = toChar(name)

    const data = {
      fullName: name, cmnd: id, phone, address, text
    }
    dispatch(toggleLoading(true))
    createGuest(data)
      .then(res => {
        if (res.data && res.data.status) {
          setCreateForm(false)
          dispatch({
            type: 'CREATE_GUEST',
            payload: res.data.newGuest
          })
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => {
        alert(err)
        // dispatch(triggerNotif({
        //   type: 'ERROR',
        //   content: 'SERVER_ERROR!'
        // }))
      })
      .then(() => {
        dispatch(toggleLoading(false))
        dispatch(getAllGuestsAsync({}))
      })
  }

  return (
    <>
      {
        status &&
        <div id='client-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm khách hàng</h4>
              <div className='create-name'>
                <label htmlFor='create_name'>Họ Tên: </label>
                <input required ref={nameEl} id='create_name' />
              </div>
              <div className='create-id'>
                <label htmlFor='create_id'>CMND: </label>
                <input required ref={idEl} id='create_id' />
              </div>
              <div className='create-phone'>
                <label htmlFor='create_phone'>SĐT: </label>
                <input type='number' required ref={phoneEl} id='create_phone' />
              </div>
              <div className='create-address'>
                <select required defaultValue='Quận/Huyện' ref={addEl} name="categories">
                  <option value="Quận/Huyện" disabled hidden>Quận/Huyện</option>
                  {
                    countries && countries.length > 0 &&
                    countries.map(item =>
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.name}
                      </option>
                    )
                  }
                </select>
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
        ||
        null
      }
    </>
  )
}

export default Create