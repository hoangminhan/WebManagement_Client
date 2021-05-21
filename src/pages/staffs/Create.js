import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersAsync, toggleLoading } from "../../redux/actions";
import { createUser } from "../../services/global";
import toChar from "../../utils/toChar";
import {
  emailValidate,
  nameValidate,
  usernameValidate,
  phoneValidate,
} from "../../utils/validate";

const Create = ({ createForm, setCreateForm }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [data, getData] = useState({
    name: "",
    path: "/images/product_default_img.png",
  });

  const [emailErr, logEmailErr] = useState(false);
  const [usernameErr, logUsernameErr] = useState(false);
  const [fullNameErr, logFullNameErr] = useState(false);
  const [phoneNumberErr, logPhoneNumberErr] = useState(false);

  const [passErr, logPassErr] = useState(false);

  const [userData, setUserData] = useState({});

  const nameEl = useRef(null);
  const phoneEl = useRef(null);
  const mailEl = useRef(null);
  const addEl = useRef(null);
  const usernameEl = useRef(null);
  const passwordEl = useRef(null);

  const emailValidation = (e) => {
    let value = e.target.value || "";
    value = value.trim();
    setUserData({
      ...userData,
      email: value,
    });

    if (value !== "") {
      logEmailErr(!emailValidate(value));
    } else {
      logEmailErr(false);
    }
  };

  const phoneNumberValidate = (e) => {
    let value = e.target.value || "";
    value = value.trim();
    setUserData({
      ...userData,
      phone: value,
    });

    if (value !== "") {
      logPhoneNumberErr(!phoneValidate(value));
    } else {
      logPhoneNumberErr(false);
    }
  };

  const usernameValidation = (e) => {
    let value = e.target.value || "";
    value = value.trim();
    setUserData({
      ...userData,
      username: value,
    });

    if (value !== "") {
      logUsernameErr(!usernameValidate(value));
    } else {
      logUsernameErr(false);
    }
  };

  const fullNameValidation = (e) => {
    let value = e.target.value || "";
    value = value.trim();
    setUserData({
      ...userData,
      fullName: value,
    });

    if (value !== "") {
      logFullNameErr(!nameValidate(value));
    } else {
      logFullNameErr(false);
    }
  };

  const passValidation = (e) => {
    let value = e.target.value || "";
    value = value.trim();
    setUserData({
      ...userData,
      password: value,
    });

    if (value !== "") {
      if (value.length < 6) {
        logPassErr(true);
      } else {
        logPassErr(false);
      }
    } else {
      logPassErr(false);
    }
  };

  const checkValidate = () => {
    if (
      !emailErr &&
      !usernameErr &&
      !fullNameErr &&
      !passErr &&
      !phoneNumberErr
    ) {
      return true;
    } else return false;
  };

  const closeForm = () => {
    setCreateForm(false);
    logEmailErr(false);
    logPassErr(false);
    logFullNameErr(false);
    logPhoneNumberErr(false);
    logUsernameErr(false);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const url = reader.result;
      setFile(url);
      getData({ name: "manh", path: url });
    };

    if (selectedFile && selectedFile.type.match("image.*")) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkValidate()) return alert("Vui lòng điền thông tin hợp lệ!");

    const fullName = nameEl.current.value.trim();
    // const id = idEl.current.value.trim()
    const phone = phoneEl.current.value.trim();
    const email = mailEl.current.value.trim();
    const address = addEl.current.value.trim();
    const username = usernameEl.current.value.trim();
    const password = passwordEl.current.value.trim();
    const text = toChar(fullName);

    const data = {
      fullName,
      email,
      phone,
      address,
      username,
      password,
      image: file,
      text,
    };

    const formData = new FormData();
    formData.append("fullName", fullName);
    // formData.append('cmnd', id)
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("image", file);

    dispatch(toggleLoading(true));
    createUser(data)
      .then((res) => {
        setCreateForm(false);

        if (res.data && res.data.status) {
          dispatch({
            type: "CREATE_USER",
            payload: res.data.staff,
          });
        } else {
          alert(res.data.message);
          // dispatch(triggerNotif({
          //   type: 'ERROR',
          //   content: res.data.message
          // }))
        }
      })
      .catch((err) => {
        // dispatch(triggerNotif({
        //   type: 'ERROR',
        //   content: 'SERVER_ERROR!'
        // }))
      })
      .then(() => {
        dispatch(toggleLoading(false));
        dispatch(getAllUsersAsync({}));
      });
  };

  return (
    <>
      {(createForm && (
        <div id="staff-create">
          <div className="create-container">
            <form onSubmit={handleSubmit} className="create-form">
              <span onClick={closeForm} className="close">
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm nhân viên</h4>
              <div className="form-container container">
                <div title="chọn ảnh đại diện" className="file-upload">
                  <div className="image-container">
                    <img src={data.path} />
                    <label htmlFor="product_image">
                      <i className="fas fa-camera"></i>
                      <input
                        onChange={handleChange}
                        hidden
                        type="file"
                        id="product_image"
                      />
                    </label>
                  </div>
                </div>
                <div className="create-name">
                  <label htmlFor="create_name">Họ Tên: </label>
                  <input
                    onChange={fullNameValidation}
                    required
                    className={fullNameErr ? "error" : ""}
                    ref={nameEl}
                    id="create_name"
                  />
                </div>
                <div className="create-phone">
                  <label htmlFor="create_phone">SĐT: </label>
                  <input
                    onChange={phoneNumberValidate}
                    className={phoneNumberErr ? "error" : ""}
                    required
                    ref={phoneEl}
                    id="create_phone"
                  />
                </div>
                <div className="create-mail">
                  <label htmlFor="create_mail">email: </label>
                  <input
                    onChange={(e) => emailValidation(e)}
                    className={emailErr ? "error" : ""}
                    required
                    ref={mailEl}
                    id="create_mail"
                  />
                </div>
                <div className="create-add">
                  <label htmlFor="create_add">Địa chỉ: </label>
                  <input required ref={addEl} id="create_add" />
                </div>
                <div className="create-username">
                  <label htmlFor="create_username">Tài khoản: </label>
                  <input
                    onChange={(e) => usernameValidation(e)}
                    className={usernameErr ? "validate-error" : ""}
                    required
                    ref={usernameEl}
                    id="create_username"
                  />
                </div>
                <div className="create-password">
                  <label htmlFor="create_password">Mật khẩu: </label>
                  <input
                    onChange={passValidation}
                    className={passErr ? "error" : ""}
                    required
                    ref={passwordEl}
                    id="create_password"
                  />
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )) ||
        null}
    </>
  );
};

export default Create;
