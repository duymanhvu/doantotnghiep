import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

import { Form } from "react-bootstrap";

import logo from "../../assets/img/logo_login.svg";

import username from "../../assets/img/ic_username.svg";

const ForgotPass = () => {
  const { forgotPass } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const forgot = await forgotPass({ email });

      if (forgot.status) {
        toast.success(forgot.status);
        navigate("/login");
      } else {
        toast.error(forgot.email);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-login form-login-forgot">
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
              <h3 className="heading">Forgot password</h3>
              <Form.Group className="form-box-id">
                <img src={username} alt="username" />
                <Form.Label>ID (E-Mail)</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Registered Email Address"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
            </div>

            <button type="submit" className="btn btn-login">
              SUBMIT
            </button>
          </>
        )}
      </div>
    </Form>
  );
};

export default ForgotPass;
