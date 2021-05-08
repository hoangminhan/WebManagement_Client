import request from '../utils/request'

//AUTH
export const auth = () => {
  return request('/auth', 'GET')
}

export const loginAuth = (userData) => {
  return request('/login', 'POST', userData)
}

export const register = (userData) => {
  return request('/register', 'POST', userData)
}
//GUESTS
export const getAllGuests = (query) => {
  const { cmnd, start, end, page, search } = query

  var url = `/guests?page=${page || 1}&`
  if (cmnd) url = url + `cmnd=${cmnd}&`
  if (start) url = url + `start=${start}&`
  if (search) url = url + `search=${search}&`
  if (end) url = url + `end=${end}&`

  return request(url, "GET")
}

export const getOneGuest = (_id) => {
  return request(`/guests/${_id}`, 'GET')
}

export const createGuest = (data) => {
  return request('/guests', 'POST', data)
}

export const updateGuest = (_id, data) => {
  return request(`/guests/${_id}`, 'PUT', data)
}

export const deleteGuest = (_id) => {
  return request(`/guests/${_id}`, 'DELETE')
}

export const searchGuest = (query) => {
  return request(`/search?q=${query}`, 'GET')
}

export const addProduct = (_id, totalMoney, productId,) => {
  return request(`/guests/${_id}/bought`, 'PUT', { totalMoney, productId, quantity: 1 } )
}

//USERS
export const createUser = (data) => {
  return request('/accounts', 'POST', data)
}

export const updateUser = (_id, data) => {
  return request(`/accounts/${_id}`, 'PUT', data)
}

export const updateAvt = (_id, data) => {
  return request(`/${_id}/avt`, 'PUT', data)
}

export const getUser = (_id) => {
  return request(`/accounts/${_id}`, 'GET')
}

export const getAllUsers = (query) => {
  const { page, search } = query
  let url = `/accounts?page=${page || 1}`
  if (search && search !== '') url = url + `&search=${search}`

  return request(url, 'GET')
}

export const deleteUser = (_id, image) => {
  return request(`/accounts/${_id}`, 'DELETE', image)
}

//PRODUCTS

export const getAllProducts = (query) => {
  const { page, search } = query || {}
  let url = `/products?page=${page || 1}&`

  if (search) {
    url = url + `search=${search}`
  }

  return request(url, 'GET')
}

export const createProduct = (data) => {
  return request('/products', 'POST', data)
}

export const updateProduct = (_id, data) => {
  return request(`/products/${_id}`, 'PUT', data)
}

export const removeProduct = (_id) => {
  return request(`/products/${_id}`, 'DELETE')
}

//PRODUCT CATEGORIES

export const getAllCategories = () => {
  return request(`/categories`, 'GET')
}