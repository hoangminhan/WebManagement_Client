import { useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsAsync, toggleLoading } from '../../redux/actions'
import { createProduct } from '../../services/global'
import toChar from '../../utils/toChar'

const Create = ({ status, setCreateForm }) => {
  const history = useHistory()

  const login = useSelector(state => state.global.login)
  const dispatch = useDispatch()

  const categories = useSelector(state => state.global.categories)

  const nameEl = useRef(null)
  const categoryEl = useRef(null)
  const priceEl = useRef(null)

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
    const price = priceEl.current.value.trim()
    const category = categoryEl.current.value !== 'Thể loại' && JSON.parse(categoryEl.current.value)._id || null
    const text = toChar(name)

    const data = {
      name, category, price, text
    }

    const categoryObj = category && JSON.parse(categoryEl.current.value) || null

    dispatch(toggleLoading(true))
    createProduct(data)
      .then(res => {
        if (res.data && res.data.status) {
          setCreateForm(false)

          dispatch({
            type: 'CREATE_PRODUCT',
            payload: {
              ...res.data.newProduct,
              category: categoryObj
            }
          })
        } else {
          // dispatch(triggerNotif({
          //   type: 'ERROR',
          //   content: res.data.message
          // }))
          alert('Sản phẩm đã tồn tại')
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
        dispatch(getAllProductsAsync({}))
      })
  }

  return (
    <>
      {
        status &&
        <div id='product-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm sản phẩm</h4>
              <div className='create-name'>
                <label htmlFor='create_name'>Tên SP: </label>
                <input required ref={nameEl} id='create_name' />
              </div>
              <div className='create-phone'>
                <label htmlFor='create_phone'>Giá: </label>
                <input required ref={priceEl} id='create_phone' type='number' min={1000} />
              </div>
              <div className='create-address'>
                <select required defaultValue='Thể loại' ref={categoryEl} name="categories">
                  <option value="Thể loại" disabled hidden>Thể loại</option>
                  {
                    categories && categories.length > 0 &&
                    categories.map(item =>
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.title}
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