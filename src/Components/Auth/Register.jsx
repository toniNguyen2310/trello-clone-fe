import React, { useState } from "react";
import "./register.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";

function Register(props) {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
                // ref={refInput}
                // value={email}
                // onKeyUp={(e) => handleKeyPress(e)}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="register-page-form-container-input">
              <label htmlFor="name">Tên người dùng</label>
              <input
                type="text"
                id="name"
                placeholder="Họ và tên"
                // value={username}
                // onKeyUp={(e) => handleKeyPress(e)}
                // onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="register-page-form-container-input input-password">
              <label htmlFor="passwordregister">Mật khẩu</label>
              <input
                id="passwordregister"
                type={isShowPass ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                // value={password}
                // onKeyUp={(e) => handleKeyPress(e)}
                // onChange={(e) => setPassword(e.target.value)}
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
          <a href="" className="register-page-form-footer-btn">
            {isLoading ? "...Loading" : "Đăng ký"}
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
