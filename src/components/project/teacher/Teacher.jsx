import React, { useState, useEffect, useContext } from "react";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Input, Form, Tooltip, Button, Popconfirm, Table, Checkbox, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { MapColumnsANT } from "../../apiCore/dataSetCollection";

const { Option } = Select;
const Teacher = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const [selectedRow, setSelectedRow] = useState(false);
  const [checkFinish, setCheckFinish] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const handleShow = (autoId) => {
    setRecordToDelete(autoId);
    setShow(true);
  };
  

  const columns = MapColumnsANT([
    {
      title: t("Họ và tên"),
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    {
      title: t("Số điện thoại"),
      dataIndex: "Phone",
      key: "Phone",
      align: "center",
    },
    {
      title: t("Email"),
      dataIndex: "Email",
      key: "Email",
      align: "center",
    },
    {
      title: t("Tài Khoản"),
      dataIndex: "Username",
      key: "Username",
      align: "center",
    },
    {
      title: t("Mật khẩu"),
      dataIndex: "Password",
      key: "Password",
      align: "center",
    },
    {
      title: t("Môn dạy"),
      dataIndex: "SubjectType",
      key: "SubjectType",
      align: "center",
      render: (value) => {
        switch (value) {
          case 0:
            return "Toán";
          case 1:
            return "Văn";
          case 2:
            return "Tiếng Anh";
          default:
            return value;
        }
      }
    },
    {
      title: t("Trạng thái"),
      dataIndex: "Status",
      key: "Status",
      align: "center",
    },
    {
      title: t("Trạng thái Admin"),
      dataIndex: "IsAdmin",
      key: "IsAdmin",
      align: "center",
    },
    {
      title: t("Chức năng"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="d-flex justify-content-center align-items-center">
          <div onClick={() => handleEditClick(record)}>
            <img src="/ic_edit.svg" alt="img" />
          </div>
          <div onClick={() => handleShow(record.Id)}>
            <img src="/ic_delete.svg" alt="img" />
          </div>
        </div>
      ),
    },
  ]);
  useEffect(() => {
    handleGetLisDigitalSignature();
  }, []);

  const handleGetLisDigitalSignature = () => {
    AxiosAPI.getTeacherGetList()
      .then((res) => {
        if (res.status === 200) {
          setListData(convertToArray(res?.data?.Data));
        } else {
          setListData([]);
        }
      })
      .catch(function (err) {
        setListData([]);
      });
  };
  const handleEditClick = (record) => {
    setSelectedRow(true);
    const subjectTypeString = (() => {
      switch (record?.SubjectType) {
        case 0:
          return "Toán";
        case 1:
          return "Văn";
        case 2:
          return "Tiếng Anh";
        default:
          return record?.SubjectType;
      }
    })();
    formCASign.setFieldsValue({
      Id: record?.Id,
      Fullname: record?.Fullname,
      Phone: record?.Phone,
      Email: record?.Email,
      Password: record?.Password,
      Username: record?.Username,
      SubjectType: subjectTypeString,
    });
  };

  const handleAddDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          fullname: values?.Fullname,
          phone: values?.Phone,
          email: values?.Email,
          password: values?.Password,
          subjectType: values?.SubjectType,
          username: values?.Username,
          isAdmin: true,
          status: true,
        };
        if (values) {
          const response = await axios.post("/api/Teacher/Insert", newData);
          console.log(response, "response");

          if (response.data?.StatusCode >= 0) {
            notificationShare(0, response.data?.StatusCode, t("thanhCong"));
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            notificationShare(-1, response.data?.StatusCode, t("thatBai"));
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          notificationShare(-1, err.response?.data?.StatusCode, t("thatBai"));
        }
      });
  };
  
  const handleEditDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          ...values,
          SubjectType: values?.SubjectType === "Toán" ? "0" : values?.SubjectType === "Văn" ? "1" : values?.SubjectType === "Tiếng Anh" ? "2" : values?.SubjectType
        };
        if (values) {
          const response = await axios.post("/api/Teacher/Update", newData);
          if (response.data?.StatusCode >= 0) {
            notificationShare(0, response.data?.StatusCode, t("thanhCong"));

            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            notificationShare(-1, response.data?.StatusCode, t("thatBai"));
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          notificationShare(-1, err.response?.data?.StatusCode, t("thatBai"));
        }
      });
  };
  const handleDelete = (autoId) => {
    axios
      .post(`/api/Teacher/Delete?id=${autoId}&Token=abcd123`)
      .then((response) => {
        if (response.status === 200 && response.data.StatusCode >= 0) {
          notificationShare(0, response.data.errorMsg, t("thanhCong"));
        } else {
          notificationShare(-1, response.data.errorMsg, t("thatBai"));
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.response && err.response.data) {
          notificationShare(-1, err.response.data, t("thatBai"));
        }
      })
      .finally(() => {
        handleGetLisDigitalSignature();
        formCASign.resetFields();
      });
  };
  const handleFinishForm = () => {
    formCASign.validateFields().then((values) => {});
  };
  

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Teacher</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>
        <Form id="form" className="form" form={formCASign} onFinish={handleFinishForm}>
          <div className="registration__form">
            <div className="registration__form-wrap">
              <div className="heading v1 text-center">Teacher</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item label={"Họ và Tên"} name={"Fullname"} className="req">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Số điện thoại"} name={"Phone"} className="req">
                    <Input />
                  </Form.Item>
                </div>

                <div className="col-lg-4">
                  <Form.Item label={"Email"} name={"Email"} className="req">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Tài Khoản"} name={"Username"} className="req">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Mật khẩu"} name={"Password"} className="req">
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Môn dạy"} name={"SubjectType"} className="req">
                    <Select className="select--modify" placeholder="Choose"
                    >
                      <Option value="0">Toán</Option>
                      <Option value="1">Văn</Option>
                      <Option value="2">Tiếng Anh</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Thao tác"} className="req">
                    <button className="btn btn-action" type="submit" onClick={selectedRow ? handleEditDigitalSignature : handleAddDigitalSignature}>
                      {selectedRow ? <span>{t("Lưu")}</span> : <span>{t("Thêm")}</span>}
                    </button>
                  </Form.Item>
                </div>
              </div>
              <div className="mt-4">
                <div className="heading v2">Danh sách</div>
                <Table
                  className="ant-table-default"
                  columns={columns}
                  dataSource={listData?.map((e, i) => ({
                    ...e,
                    key: e?.autoId,
                  }))}
                  pagination={false}
                  scroll={{
                    x: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn xóa!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete(recordToDelete);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Teacher;
