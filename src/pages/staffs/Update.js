import { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateGuest, updateUser } from '../../services/global'
import { toggleLoading } from '../../redux/actions'
import toChar from '../../utils/toChar'

const Update = ({ updateForm, setUpdateForm }) => {
  const history = useHistory()
  const { info } = updateForm

  const login = useSelector(state => state.global.login)
  const users = useSelector(state => state.global.users)
  const dispatch = useDispatch()

  const [file, setFile] = useState(null)
  const [data, getData] = useState({ name: '', path: '/images/user_default_img.png' })

  const nameEl = useRef(null)
  const imageEl = useRef(null)
  const phoneEl = useRef(null)
  const addEl = useRef(null)
  const usernameEl = useRef(null)
  const passwordEl = useRef(null)

  useEffect(() => {
    getData({
      path: info.image && info.image.url
    })
  }, [info])

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      setFile(url)
      getData({ name: 'manh', path: url })
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const fullName = nameEl.current.value.trim()
    // const id = idEl.current.value.trim()
    const phone = phoneEl.current.value.trim()
    const address = addEl.current.value.trim()
    const username = usernameEl.current.value.trim()
    const password = passwordEl.current.value.trim()
    const text = toChar(fullName)

    let checkUsername = false
    users.forEach(item => {
      if (item.username == username && item.username !== info.username ) {
        checkUsername = true
      }
    })

    if (checkUsername) return alert('Username đã tồn tại!')
    const data = {
      fullName, text, phone, address, username, password, image: info.image
    }

    if (file) {
      data.newImage = file
    }

    const formData = new FormData()
    formData.append('fullName', fullName)
    // formData.append('cmnd', id)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('image', file)

    dispatch(toggleLoading(true))
    updateUser(info._id, data)
      .then(res => {
        if (res.data && res.data.status) {
          dispatch({
            type: 'UPDATE_USER',
            payload: res.data.newStaff
          })
        } else {
          // dispatch(triggerNotif({
          //   type: 'ERROR',
          //   content: res.data.message
          // }))
        }
      })
      .catch(err => {
        // dispatch(triggerNotif({
        //   type: 'ERROR',
        //   content: 'SERVER_ERROR!'
        // }))
      })
      .then(() => {
        dispatch(toggleLoading(false))
        setFile(null)
        setUpdateForm({ status: false, info: {} })
      })
  }

  return (
    <>
      {
        updateForm.status &&
        <div id='staff-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setUpdateForm({ status: false, info: {} }) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Chỉnh sửa nhân viên</h4>
              <div className='form-container container'>
                <div title='chọn ảnh đại diện' className='file-upload'>
                  <div className='image-container'>
                    <img src={data.path || '/images/user_default_img.png'} />
                    <label htmlFor='product_image'>
                      <i className="fas fa-camera"></i>
                      <input defaultValue={null} key={info._id} onChange={handleChange} hidden type='file' ref={imageEl} id='product_image' />
                    </label>
                  </div>
                </div>
                <div className='create-name'>
                  <label htmlFor='create_name'>Họ Tên: </label>
                  <input defaultValue={info.fullName} required ref={nameEl} id='create_name' />
                </div>
                {/* <div className='create-id'>
                  <label htmlFor='create_id'>CMND: </label>
                  <input defaultValue={info.cmnd} required ref={idEl} id='create_id' />
                </div> */}
                <div className='create-phone'>
                  <label htmlFor='create_phone'>SĐT: </label>
                  <input defaultValue={info.phone} required ref={phoneEl} id='create_phone' />
                </div>
                <div className='create-add'>
                  <label htmlFor='create_add'>Địa chỉ: </label>
                  <input defaultValue={info.address} required ref={addEl} id='create_add' />
                </div>
                <div className='create-username'>
                  <label htmlFor='create_username'>Tài khoản: </label>
                  <input defaultValue={info.username} required ref={usernameEl} id='create_username' />
                </div>
                <div className='create-password'>
                  <label htmlFor='create_password'>Mật khẩu: </label>
                  <input defaultValue={info.password} required ref={passwordEl} id='create_password' />
                </div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        ||
        null
      }
    </>
  )
}

export default Update