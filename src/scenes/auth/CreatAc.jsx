import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

import { Form } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";

import logo from "../../assets/logoSen.png";

import username from "../../assets/img/ic_username.svg";
import pass_word from "../../assets/img/ic_password.svg";
import password_desc from "../../assets/img/ic_password_desc.svg";

const CreateAccountjs = () => {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setshowPass] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginData = await loginUser({ email, password });

      if (loginData.status === 1) {
        toast.success(loginData.message);
        navigate("/registration");
      } else {
        toast.error(loginData);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPass = (e) => {
    e.preventDefault();
    if (showPass === "password") setshowPass("text");
    else setshowPass("password");
  };

  return (
    <Form onSubmit={handleSubmit} className="form-login">
      <div className="form-login-wrap animate__animated animate__fadeIn">
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>

        {loading ? (
          <>
            <div className="loading">
              <div className="arc"></div>
              <div className="arc"></div>
              <div className="arc"></div>
            </div>
          </>
        ) : (
          <>
            <div className="form-login-field">
              <h3 className="heading">Đăng ký tài khoản</h3>
              <Form.Group className="form-box-id">
                <img src={username} alt="username" />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Register Email Address"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-box-password">
                <img
                  src={pass_word}
                  alt="passwords"
                  className="form-box-password-ic"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPass}
                  placeholder="Confirmation Code 1"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <a
                  href="#"
                  className="form-box-password-btn"
                  onClick={handleShowPass}
                >
                  <img
                    src={password_desc}
                    alt="password"
                    className="form-box-password-desc"
                  />
                </a>
              </Form.Group><Form.Group className="form-box-password">
                <img
                  src={pass_word}
                  alt="passwords"
                  className="form-box-password-ic"
                />
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control
                  type={showPass}
                  placeholder="Confirmation Code 2"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <a
                  href="#"
                  className="form-box-password-btn"
                  onClick={handleShowPass}
                >
                  <img
                    src={password_desc}
                    alt="password"
                    className="form-box-password-desc"
                  />
                </a>
              </Form.Group>
            </div>

            <button type="submit" className="btn btn-login">
              Đăng ký
            </button>
          </>
        )}

        <div className="btn-login">
          <Form.Text>
            <Link to="/home">Quay lại</Link>
          </Form.Text>
        </div>
      </div>
    </Form>
  );
};

export default CreateAccountjs;
