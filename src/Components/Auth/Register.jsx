import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import { message, notification } from "antd";
import LoadingButton from "../Variable/Variable";

function Register(props) {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleRegister(e);
    }
  };

  //Validate email
  const validateEmail = (value) => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = regexEmail.test(value);
    return isValid;
  };

  const validatePassword = (value) => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let isValid = regexPassword.test(value);
    return isValid;
  };
  //HANDLE REGISTER
  let isDuplicate = false;
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !username || !password) {
      message.error("Thông tin không được để trống");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      message.error("Email sai định dạng");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      message.error("Mật khẩu cần tối thiểu 6 ký tự");
      setIsLoading(false);

      return;
    }
    message.success("Đăng nhập thành công");
    return;
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div className="register-page">
      <div className="register-page-form">
        <div className="register-page-form-lorup">
          <NavLink to={`/login`}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Đăng ký
          </NavLink>
        </div>
        <div className="register-page-form-container">
          {/* Email */}
          <form name="myForm">
            <div className="register-page-form-container-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Vui lòng nhập email của bạn"
                ref={refInput}
                value={email}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="register-page-form-container-input">
              <label htmlFor="name">Tên người dùng</label>
              <input
                type="text"
                id="name"
                placeholder="Họ và tên"
                value={username}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="register-page-form-container-input input-password">
              <label htmlFor="passwordregister">Mật khẩu</label>
              <input
                id="passwordregister"
                type={isShowPass ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              {isShowPass ? (
                <AiFillEye onClick={() => setIsShowPass(!isShowPass)} />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setIsShowPass(!isShowPass)}
                />
              )}
            </div>
          </form>
        </div>
        <div className="register-page-form-footer">
          <a
            href=""
            className="register-page-form-footer-btn"
            onClick={handleRegister}
          >
            Đăng ký
            {isLoading && (
              <LoadingButton color={"#072754"} secondaryColor={"#ffffff"} />
            )}
          </a>

          <p>
            Bạn đã có tài khoản&nbsp;
            <NavLink to={`/login`}>Đăng nhập ngay!!</NavLink>
          </p>
        </div>
        <NavLink to={`/`}>
          <AiOutlineClose className="register-page-form-close" />
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
