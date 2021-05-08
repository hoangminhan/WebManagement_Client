import { useEffect } from "react"
import { useDispatch } from "react-redux"

const About = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: 'Thông tin'
    })
  })

  return (
    <div id='about-tab'>
      <div className='about-tab-container'>
        <h1>Bùi Văn Mạnh</h1>
        <h4>17/11/2001</h4>
        <h4>Khoa Học Máy Tính 2 - K14</h4>
        <h4>Đại Học Công Nghiệp Hà Nội - FIT - HaUI</h4>
        <h1 style={{color: 'blue', margin: 32}}>
          ĐỒ ÁN TỐT NGHIỆP: PHẦN MỀM QUẢN LÝ
        </h1>
      </div>
    </div>
  )

}

export default About