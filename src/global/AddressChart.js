import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGuestsAsync, getUserData } from '../redux/actions'

const AddressChart = () => {
  const countries = useSelector(state => state.global.countries)
  const guests = useSelector(state => state.global.guests)
  const newContries = countries.map(add => {
    let count = 0
    guests.forEach(guest => {
      if (guest.address && guest.address.id === add.id)
      count++
    })

    return {
      ...add,
      quantity: count
    }
  })

  const quantities = newContries.map(item => item.quantity)
  const categories = newContries.map(item => item.name)
  const dispatch = useDispatch()

  const [options, setOptions] = useState({
    title: {
      text: 'Quận/Huyện'
    },
    xAxis: {
      categories: [],
    },
    series: [{
      data: []
    }]
  })

  useEffect(() => {
    dispatch(getAllGuestsAsync({}))
  }, [])

  useEffect(() => {
    setOptions(
      {
        ...options,
        xAxis: {
          categories: categories,
        },
        series: [{
          data: quantities
        }]
      })
  }, [guests])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default AddressChart