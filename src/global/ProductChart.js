import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAsync } from '../redux/actions'

const ProductChart = () => {
  const products = useSelector(state => state.global.products)
  const quantities = products.map(item => item.sold)
  const categories = products.map(item => item.name)
  const dispatch = useDispatch()

  const [options, setOptions] = useState({
    title: {
      text: 'Đã bán'
    },
    xAxis: {
      categories: [],
    },
    series: [{
      data: []
    }]
  })

  useEffect(() => {
    dispatch(getAllProductsAsync({}))
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
  }, [products])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default ProductChart