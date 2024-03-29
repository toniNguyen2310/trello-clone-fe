import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import { NavLink } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import { message } from "antd";
import LoadingButton from "../Loading/LoadingButton";
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../Service/service";
import { useEnterSubmit } from "../../Utilities/hooks/useEnterSubmit";
import { validateEmail } from "../../Utilities/constant";

function Register(props) {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  //HANDLE REGISTER
  let isDuplicate = false;
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Validate email, username, password
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
    //Api
    const res = await callRegister(
      email.toLowerCase().trim(),
      username.trim(),
      password.trim()
    );

    if (res?.data?._id && !isDuplicate) {
      setIsLoading(false);
      message.success("Đăng ký tài khoản thành công");
      navigate("/login");
      isDuplicate = true;
    } else {
      setIsLoading(false);
      message.error("Email đã tồn tại hãy thử lại");
      return;
    }
    refInput.current.focus();
    setIsShowPass(false);
    setEmail("");
    setUserName("");
    setPassword("");
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
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
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
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
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
                onKeyUp={(e) => useEnterSubmit(e, handleRegister)}
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
