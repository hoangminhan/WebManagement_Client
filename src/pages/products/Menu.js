import { useDispatch } from "react-redux"
import { getAllProductsAsync } from "../../redux/actions"
import toChar from "../../utils/toChar"

const ProductMenu = ({ setCreateForm }) => {
  const dispatch = useDispatch()

  const searchProduct = (e) => {
    const value = e.target.value
    dispatch(getAllProductsAsync({ search: toChar(value) }))
  }

  return (
    <div id='product-menu'>
      <div className='product-menu-container'>
        <ul>
          <li className='add'>
            <button onClick={() => setCreateForm(true)}>
              <i className="fas fa-plus"></i>
              <span>
                Thêm sản phẩm
              </span>
            </button>
          </li>
          <li className='name'>
            <input onChange={searchProduct} id='name' placeholder='Tìm kiếm sản phẩm...' />
            <button className='staff-search'>
              <i className="fas fa-search"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProductMenu