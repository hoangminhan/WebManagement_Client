import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from '../../global/Pagination'
import Warning from '../../global/Warning'
import { getAllProductsAsync, removeProductAsync } from '../../redux/actions'
import formatNumber from '../../utils/formatNum'
const ProductList = ({ setClientInfo, setUpdateForm, setProduct }) => {
  const products = useSelector(state => state.global.products)
  const productPage = useSelector(state => state.global.productPage)

  const dispatch = useDispatch()

  const deleteProduct = (_id) => {
    dispatch(removeProductAsync(_id))
  }

  const changePage = (page) => {
    dispatch(getAllProductsAsync({page}))
  }

  return (
    <div id='product-list'>
      <div className='product-list-container'>
        {
          products && products.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='count'>
                <span>STT</span>
              </div>
              <div className='info'>
                <span>Tên</span>
                <span>Thể Loại</span>
                <span>Giá</span>
              </div>
              <div className='tools'>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              products.map((item, index) => {
                if (index < 10) return (
                  <li key={item._id}>
                    <div className='count'>
                      <span>{index + 1}</span>
                    </div>
                    <div className='info'>
                      <span className='name'>
                        {item.name}
                    </span>
                      <span style={{ fontWeight: 'bold' }}>{item.category && item.category.title || <strong style={{color: 'red'}}>Chưa cập nhật</strong>}</span>
                      <span>{formatNumber(item.price)}đ</span>
                    </div>
                    <div className='tools'>
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item })}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => deleteProduct(item._id)} className='remove'>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có sản phẩm!' />
        }
      </div>
      <div className='client-pagination'>
        <Pagination totalPage={productPage.totalPage} currentPage={productPage.currentPage} changePage={changePage} />
      </div>
    </div>
  )
}

export default ProductList