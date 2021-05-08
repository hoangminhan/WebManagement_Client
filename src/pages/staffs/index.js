import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllUsersAsync } from "../../redux/actions"
import Create from "./Create"
import StaffList from "./List"
import StaffMenu from "./Menu"
import Update from "./Update"

const Staff = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Nhân viên'
    })

    dispatch(getAllUsersAsync({}, true))
  })

  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState({status: false, info: {}})

  return (
    <div id='staff-tab'>
      <Create createForm={createForm} setCreateForm={setCreateForm} />
      <Update updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <div className='staff-container'>
        <StaffMenu setCreateForm={setCreateForm} />
        <StaffList setUpdateForm={setUpdateForm} />
      </div>
    </div>
  )
}

export default Staff