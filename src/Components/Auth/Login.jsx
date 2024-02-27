import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import { message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import LoadingButton from "../Loading/LoadingButton";
import { callLogin } from "../../Service/service";
import { useEnterSubmit } from "../../Utilities/hooks/useEnterSubmit";
function Login(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const refInput = useRef(null);
  let isDuplicate = false;

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Validate email, password
    if (!email.trim() || !password.trim()) {
      message.error("Thông tin không được để trống");
      setIsLoading(false);
      return;
    }
    //Api
    const res = await callLogin(email.trim(), password.trim());

    if (res?.data?.userWP && !isDuplicate) {
      //Save access token and refresh token to Local Storage
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("refresh_token", res.data.refreshToken);

      const dataUser = {
        id: res.data.userWP._id,
        username: res.data.userWP.username,
        email: res.data.userWP.email
      };

      const board = res.data.userWP.board;
      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("listColumns", JSON.stringify(board));
      isDuplicate = true;
      message.success("Đăng nhập thành công");
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("Thông tin đăng nhập không đúng");
      return;
    }
    setEmail("");
    setPassword("");
    setIsShowPass("");
  };

  useEffect(() => {
    refInput.current.focus();
  }, []);
  return (
    <div className="login-page">
      <div className="login-page-form">
        <div className="login-page-form-lorup">
          <NavLink to={"/login"}>Đăng nhập</NavLink> &nbsp; &Iota; &nbsp;{" "}
          <NavLink to={"/register"} href="">
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
                onKeyUp={(e) => useEnterSubmit(e, handleLogin)}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-page-form-container-input input-password">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="passwordLogin"
                type={isShowPass ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                onKeyUp={(e) => useEnterSubmit(e, handleLogin)}
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
            <NavLink to={"/register"}>Đăng ký ngay</NavLink>
          </p>
        </div>
        <NavLink to={"/"}>
          <AiOutlineClose className="login-page-form-close" />
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
