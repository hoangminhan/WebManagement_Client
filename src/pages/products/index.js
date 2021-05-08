import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllProductsAsync } from "../../redux/actions"
import Create from "./Create"
import ProductList from "./List"
import ProductMenu from "./Menu"
import Update from "./Update"

const Product = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Sản phẩm'
    })
    
    dispatch(getAllProductsAsync({}, true))
  }, [])

  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState({ status: false, info: {} })
  return (
    <div id='product-tab'>
      <Create status={createForm} setCreateForm={setCreateForm} />
      <Update updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <div className='product-container'>
        <ProductMenu setCreateForm={setCreateForm} />
        <ProductList setUpdateForm={setUpdateForm} />
      </div>
    </div>
  )
}

export default Product