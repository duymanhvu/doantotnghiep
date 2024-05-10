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
  const { registerUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [subjectType, setSelectedSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [isParent, setIsParent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPass, setshowPass] = useState("password");

  const navigate = useNavigate();
  const subjects = [
    { value: 0, label: "Toán" },
    { value: 1, label: "Văn" },
    { value: 2, label: "Tiếng Anh" },
    // thêm các môn học khác
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginData = await registerUser({ email, password, fullName, phone, isParent, subjectType, experience });
      if (loginData.StatusCode === 1) {
        if (isParent) {
          toast.success("Đăng ký thành công");
          navigate("/login");
        } else {
          toast.info("Đăng ký thầy giáo thành công. Vui lòng chờ quản trị viên duyệt tài khoản.");
          navigate("/login");
        }
      } else {
        toast.error(loginData.ErrorMessage);
        setEmail("");
        setPassword("");
        setFullName("");
        setPhone("");
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
                <Form.Control type="email" placeholder="Register Email Address" required value={email} onChange={(event) => setEmail(event.target.value)} />
              </Form.Group>
              <Form.Group className="form-box-id">
                <img src={username} alt="fullName" />
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control type="text" placeholder="Register Full Name" required value={fullName} onChange={(event) => setFullName(event.target.value)} />
              </Form.Group>
              <Form.Group className="form-box-id">
                <img src={username} alt="phone" />
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="number" placeholder="Register Phone" required value={phone} onChange={(event) => setPhone(event.target.value)} />
              </Form.Group>
              <Form.Group className="form-box-password">
                <img src={pass_word} alt="passwords" className="form-box-password-ic" />
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPass} placeholder="Confirmation password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                <a href="#" className="form-box-password-btn" onClick={handleShowPass}>
                  <img src={password_desc} alt="password" className="form-box-password-desc" />
                </a>
              </Form.Group>
              <Form.Group className="form-box-role">
                <Form.Label>Vai trò</Form.Label>
                <div>
                  <Form.Check type="radio" id="teacher" label="Phụ huynh" checked={isParent} onChange={() => setIsParent(true)} />
                  <Form.Check type="radio" id="parent" label="Thầy giáo" checked={!isParent} onChange={() => setIsParent(false)} />
                </div>
              </Form.Group>
              {!isParent && (
                <Form.Group className="form-box-id">
                  <Form.Label>Môn dạy</Form.Label>
                  <Form.Control placeholder="Subject" as="select" value={subjectType} onChange={(e) => setSelectedSubject(e.target.value)}>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              {!isParent && (
                <Form.Group className="form-box-id">
                  <Form.Label>Thông tin về kinh nghiệm</Form.Label>
                  <Form.Control type="text" placeholder="Experience" required value={experience} onChange={(event) => setExperience(event.target.value)} />
                </Form.Group>
              )}
            </div>

            <button type="submit" className="btn btn-login">
              Đăng ký
            </button>
          </>
        )}

        <div className="btn-login">
          <Form.Text>
            <Link to="/login">Quay lại</Link>
          </Form.Text>
        </div>
      </div>
    </Form>
  );
};

export default CreateAccountjs;
