import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGuestsAsync } from '../redux/actions'
import { PieChart } from 'react-minimal-pie-chart'
import getMedal from '../utils/getMedal'

const PieChart1 = ({ totalGuests}) => {
  const dispatch = useDispatch()
  const guests = useSelector(state => state.global.guests)
  const guests1 = guests.filter(x => getMedal(x.totalMoney) === 'Đặc Biệt')
  const guests2 = guests.filter(x => getMedal(x.totalMoney) === 'VIP')
  const guests3 = guests.filter(x => getMedal(x.totalMoney) === 'Tiềm Năng')
  const guests4 = guests.filter(x => getMedal(x.totalMoney) === 'Vãng Lai')

  useState(() => {
    dispatch(getAllGuestsAsync({page: -1}))
  }, [])

  return (
    <>
      <PieChart
        data={[
          { title: 'Đặc biệt', value: guests1.length, color: '#E38627', key: 'Manh' },
          { title: 'VIP', value: guests2.length, color: '#C13C37' },
          { title: 'Tiềm Năng', value: guests3.length, color: '#6A2135' },
          { title: 'Vãng Lai', value: guests4.length, color: '#6A2457' },
        ]}
      />
      <span style={{ background: "#E38627" }}>{`${Math.ceil(guests1.length / totalGuests * 100)}%`} Đ.Biệt</span>
      <span style={{ background: "#C13C37" }}>{`${Math.ceil(guests2.length / totalGuests * 100)}%`} VIP</span>
      <span style={{ background: "#6A2135" }}>{`${Math.ceil(guests3.length / totalGuests * 100)}%`} T.Năng</span>
      <span style={{ background: "#6A2457" }}>{`${Math.ceil(guests4.length / totalGuests * 100)}%`} V.Lai</span>
    </>
  )
}

export default PieChart1