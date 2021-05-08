const initialState = {
  login: false,
  auth: {},
  title: '',
  popup: {
    active: false,
    content: ''
  },
  menu: [
    {
      title: 'Tổng quan',
      path: '/',
      icon: <i className="fas fa-chart-bar"></i>
    },
    {
      title: 'Quản lý khách hàng',
      path: '/clients',
      icon: <i className="fas fa-users" />
    },
    {
      title: 'Quản lý nhân viên',
      path: '/staffs',
      icon: <i className="fas fa-id-card"></i>
    },
    {
      title: 'Quản lý sản phẩm',
      path: '/products',
      icon: <i className="fas fa-shopping-bag"></i>
    },
    {
      title: 'Thông tin',
      path: '/about',
      icon: <i className="fas fa-info"></i>
    },
  ],
  countries: [
    {
      id: 1,
      name: 'Quận 12'
    },
    {
      id: 2,
      name: 'Quận Thủ Đức'
    },
    {
      id: 3,
      name: 'Quận 9'
    },
    {
      id: 4,
      name: 'Quận Gò Vấp'
    },
    {
      id: 5,
      name: 'Quận Bình Thạnh'
    },
    {
      id: 6,
      name: 'Quận Tân Bình'
    },
    {
      id: 7,
      name: 'Quận Tân Phú'
    },
    {
      id: 8,
      name: 'Quận Phú Nhuận'
    },
    {
      id: 9,
      name: 'Quận 2'
    },
    {
      id: 10,
      name: 'Quận 3'
    },
    {
      id: 11,
      name: 'Quận 10'
    },
    {
      id: 12,
      name: 'Quận 11'
    },
    {
      id: 13,
      name: 'Quận 4'
    },
    {
      id: 14,
      name: 'Quận 5'
    },
    {
      id: 15,
      name: 'Quận 6'
    },
    {
      id: 16,
      name: 'Quận 8'
    },
    {
      id: 17,
      name: 'Quận Bình Tân'
    },
    {
      id: 18,
      name: 'Quận 7'
    },
    {
      id: 19,
      name: 'Huyện Củ Chi'
    },
    {
      id: 20,
      name: 'Huyện Hóc Môn'
    },
    {
      id: 21,
      name: 'Huyện Bình Chánh'
    },
    {
      id: 22,
      name: 'Huyện Nhà Bè'
    },
    {
      id: 23,
      name: 'Huyện Cần Giờ'
    },
    {
      id: 24,
      name: 'Quận 1'
    }
  ],
  user: {
    _id: '',
    fullName: '',
    role: null,
    userImage: null,
    email: '',
    address: '',
    phone: '',
  },
  loading: false,
  users: [],
  userPage: {},
  guests: [],
  guestPage: {},
  guest: {},
  profile: {},
  products: [],
  productPage: {},
  categories: []
}

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TITLE': {
      return {
        ...state,
        title: action.payload || 'Lỗi Tiêu Đề'
      }
    }

    case 'GET_ONE_GUEST': {
      return {
        ...state,
        guest: {
          ...action.payload
        }
      }
    }

    case 'GET_ALL_GUESTS': {
      return {
        ...state,
        guests: [
          ...action.payload.guests
        ],
        guestPage: action.payload.guestPage
      }
    }

    case 'CREATE_GUEST': {
      const { guests } = state
      return {
        ...state,
        guests: [
          ...guests,
          action.payload
        ]
      }
    }

    case 'UPDATE_GUEST': {
      const { guests } = state
      const { _id } = action.payload
      return {
        ...state,
        guests: [...guests.filter(x => x._id !== _id), action.payload]
      }
    }

    case 'REMOVE_GUEST': {
      const { guests } = state

      return {
        ...state,
        guests: [...guests.filter(x => x._id !== action.payload)]
      }
    }

    case 'CREATE_USER': {
      const { users } = state
      return {
        ...state,
        users: [
          ...users,
          action.payload
        ]
      }
    }

    case 'UPDATE_USER': {
      const { users } = state
      const { _id } = action.payload
      return {
        ...state,
        users: [
          ...users.filter(x => x._id !== _id),
          action.payload
        ]
      }
    }

    case 'REMOVE_USER': {
      const { users } = state

      return {
        ...state,
        users: [
          ...users.filter(x => x._id !== action.payload)
        ]
      }
    }

    case 'CREATE_PRODUCT': {
      const { products } = state
      return {
        ...state,
        products: [
          ...products,
          action.payload
        ]
      }
    }

    case 'GET_ALL_PRODUCTS': {
      return {
        ...state,
        products: [
          ...action.payload.products
        ],
        productPage: action.payload.productPage
      }
    }

    case 'REMOVE_PRODUCT': {
      const { products } = state
      return {
        ...state,
        products: products.filter(x => x._id !== action.payload)
      }
    }

    case 'UPDATE_PRODUCT': {
      const { products } = state
      const { _id } = action.payload
      return {
        ...state,
        products: [...products.filter(x => x._id !== _id), action.payload]
      }
    }

    case 'GET_ALL_USERS': {
      return {
        ...state,
        users: [
          ...action.payload.users
        ],
        userPage: action.payload.userPage
      }
    }

    case 'GET_CATEGORIES': {
      return {
        ...state,
        categories: [
          ...action.payload
        ]
      }
    }

    case 'TOGGLE_LOADING': {
      return {
        ...state,
        loading: action.payload
      }
    }

    case 'GET_USER_DATA': {
      const { login, fullName, address, _id, image, role, token, email, username, phone } = action.payload
      localStorage.setItem('accessToken', token)
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          userImage: image,
          phone,
          email,
          address,
        }
      }
    }

    case 'AUTHENTICATION': {
      const { login, user } = action.payload
      const { fullName, address, _id, image, role, email, username, phone } = user
      return {
        ...state,
        login: login,
        user: {
          _id,
          username,
          fullName,
          role,
          userImage: image,
          phone,
          email,
          address,
        }
      }
    }

    case 'CLEAR_DATA': {
      return {
        ...state,
        login: false,
        user: {
          _id: '',
          username: '',
          fullName: '',
          role: '',
          userImage: null,
          phone: '',
          email: '',
          address: ''
        }
      }
    }
  }

  return state
}

export default globalReducer