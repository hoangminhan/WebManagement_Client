import * as API from "../../services/global";
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

export const auth = () => {
  return (dispatch) => {
    API.auth().then((res) => {
      if (res.data && res.data.status) {
        let payload = {
          login: res.data.login,
          user: res.data.user,
        };
        dispatch(authAsync(payload));
      } else {
        console.log("Lỗi xác thực!");
      }
    });
  };
};

export const authAsync = (payload) => {
  return {
    type: "AUTHENTICATION",
    payload,
  };
};

export const toggleLoading = (payload) => {
  return {
    type: "TOGGLE_LOADING",
    payload,
  };
};

export const triggerNotif = (payload) => {
  return {
    type: "TRIGGER_NOTIF",
    payload,
  };
};

export const getAllProductsAsync = (query, loading) => {
  return (dispatch) => {
    if (loading) dispatch(toggleLoading(true));

    API.getAllProducts(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllProducts({
              products: res.data.products,
              productPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
              },
            })
          );
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const getAllProducts = (payload) => {
  return {
    type: "GET_ALL_PRODUCTS",
    payload,
  };
};

export const getAllGuestsAsync = (query, loading) => {
  return (dispatch) => {
    if (loading) dispatch(toggleLoading(true));

    API.getAllGuests(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllGuests({
              guests: res.data.guests,
              guestPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
                totalGuests: res.data.totalGuests,
              },
            })
          );
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const getAllGuests = (payload) => {
  return {
    type: "GET_ALL_GUESTS",
    payload,
  };
};

export const getAllUsersAsync = (query, loading) => {
  return (dispatch) => {
    if (loading) dispatch(toggleLoading(true));

    API.getAllUsers(query)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(
            getAllUsers({
              users: res.data.staffs,
              userPage: {
                totalPage: res.data.totalPage,
                currentPage: res.data.currentPage,
              },
            })
          );
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const removeUsersAsync = (_id, image) => {
  return (dispatch) => {
    dispatch(toggleLoading(true));

    API.deleteUser(_id, image)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(removeUser(_id));
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
        dispatch(getAllUsersAsync({}));
      });
  };
};

export const removeUser = (payload) => {
  return {
    type: "REMOVE_USER",
    payload,
  };
};

export const removeGuestAsync = (_id) => {
  return (dispatch) => {
    API.deleteGuest(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(removeGuest(_id));
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
        dispatch(getAllGuestsAsync({}));
      });
  };
};

export const removeGuest = (payload) => {
  return {
    type: "REMOVE_GUEST",
    payload,
  };
};

export const getAllUsers = (payload) => {
  return {
    type: "GET_ALL_USERS",
    payload,
  };
};

export const getUserData = (userData) => {
  return {
    type: "GET_USER_DATA",
    payload: userData,
  };
};

export const getAllCategoriesAsync = () => {
  return (dispatch) => {
    API.getAllCategories()
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(getAllCategories(res.data.categories));
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const removeProduct = (payload) => {
  return {
    type: "REMOVE_PRODUCT",
    payload,
  };
};

export const removeProductAsync = (_id) => {
  return (dispatch) => {
    API.removeProduct(_id)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(removeProduct(_id));
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
        dispatch(getAllProductsAsync({}));
      });
  };
};

export const updateProductAsync = (_id, data) => {
  return (dispatch) => {
    API.updateProduct(_id, data)
      .then((res) => {
        if (res.data && res.data.status) {
          dispatch(updateProduct(_id, data));
        } else {
          triggerNotif({
            type: "ERROR",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch(
          triggerNotif({
            type: "ERROR",
            content: "SERVER_ERROR!",
          })
        );
      })
      .then(() => {
        dispatch(toggleLoading(false));
      });
  };
};

export const updateProduct = (payload) => {
  return {
    type: "UPDATE_PRODUCT",
    payload,
  };
};

export const getAllCategories = (payload) => {
  return {
    type: "GET_CATEGORIES",
    payload,
  };
};
