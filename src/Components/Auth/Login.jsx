import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import { message, notification } from "antd";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import LoadingButton from "../Variable/Variable";
function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const refInput = useRef(null);

  //Enter to submit
  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      handleLogin(e);
    }
  };

  // let isDuplicate = false;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //VALIDATE VALUE
    if (!email.trim() || !password.trim()) {
      message.error("Thông tin không được để trống");
      setIsLoading(false);
      return;
    }
    console.log("user>>> ", email.trim(), password.trim());
    message.success("Đăng nhập thành công");
    return;
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div className="login-page">
      <div className="login-page-form">
        <div className="login-page-form-lorup">
          <NavLink to={`/login`}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={`/register`} href="">
            Đăng ký
          </NavLink>
        </div>
        <div className="login-page-form-container">
          <form name="myForm">
            <div className="login-page-form-container-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                ref={refInput}
                placeholder="Vui lòng nhập email của bạn"
                value={email}
                onKeyUp={(e) => handleKeyPress(e)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-page-form-container-input input-password">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="passwordLogin"
                type={isShowPass ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                onKeyUp={(e) => handleKeyPress(e)}
                value={password}
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
        <div className="login-page-form-footer">
          <a
            href=""
            className="login-page-form-footer-btn"
            onClick={handleLogin}
          >
            Đăng nhập
            {isLoading && (
              <LoadingButton color={"#072754"} secondaryColor={"#ffffff"} />
            )}
          </a>
          <p>
            Bạn chưa có tài khoản?
            <NavLink to={`/register`}>Đăng ký ngay</NavLink>
          </p>
        </div>
        <NavLink to={`/`}>
          <AiOutlineClose className="login-page-form-close" />
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
