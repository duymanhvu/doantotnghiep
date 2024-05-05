import React, { useState, useEffect, useContext } from "react";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Input, Form, Tooltip, Button, Popconfirm, Table, Checkbox, Select, message, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { MapColumnsANT } from "../../apiCore/dataSetCollection";
import { toast } from "react-toastify";

const { Option } = Select;
const ClassRoom = () => {
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
  const [listSubject, setListSubject] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [listRoom, setListRoom] = useState([]);

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
      },
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
    AxiosAPI.getSubjectGetList()
      .then((res) => {
        if (res.status === 200) {
          setListSubject(convertToArray(res?.data?.Data));
        } else {
          setListSubject([]);
        }
      })
      .catch(function (err) {
        setListSubject([]);
      });
    AxiosAPI.getClassRoomGetListRoom()
      .then((res) => {
        if (res.status === 200) {
          setListRoom(convertToArray(res?.data?.Data));
        } else {
          setListRoom([]);
        }
      })
      .catch(function (err) {
        setListRoom([]);
      });
    handleGetLisDigitalSignature();
  }, []);
  console.log(listSubject, "setListSubjectsetListSubjectsetListSubject", listTeacher);

  const handleGetListTeacher = (value) => {
    const params = {
      pageSize: 10,
      pageIndex: 1,
      sortBy: "Id",
      orderBy: "desc",
      keyword: "",
      subjectType: value,
    };
    axios
      .post("/api/Teacher/GetTeacherBySubjectType", params)
      .then((res) => {
        if (res.status === 200) {
          setListTeacher(convertToArray(res?.data?.Data));
        } else {
          setListTeacher([]);
        }
      })
      .catch(function (err) {
        setListTeacher([]);
      });
  };
  const handleGetLisDigitalSignature = () => {
    AxiosAPI.getClassRoomGetList()
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
  console.log(listData, "listDatalistData");
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
            toast.success("Processing complete!");
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            toast.error("Error!");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          message.error("Error!");
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
        };
        if (values) {
          const response = await axios.post("/api/Teacher/Update", newData);
          if (response.data?.StatusCode >= 0) {
            message.success("Processing complete!");
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            message.error("Error!");
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
      .post(`/api/Teacher/Delete?id=${autoId}?Token=abcd123`)
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
            <h1 className="animate__animated animate__fadeInUp">ClassRoom</h1>
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
              <div className="heading v1 text-center">ClassRoom</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item label={"Tên Phòng"} name={"ClassroomNo"} className="req">
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listRoom).map((e, key) => (
                        <Option key={key} value={e.Key}>
                          {e.Value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Ngày bắt đầu"} name={"StartDate"} className="req">
                    <Input type="date" />
                  </Form.Item>
                </div>

                <div className="col-lg-4">
                  <Form.Item label={"Ngày kết thúc"} name={"EndDate"} className="req">
                    <Input type="date" />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Môn học"} name={"SubjectId"} className="req">
                    <Select
                      className="select--modify"
                      placeholder="Choose"
                      onChange={(value) => {
                        const subject = convertToArray(listSubject).find((e) => e.Id === value)?.SubjectType;
                        handleGetListTeacher(subject);
                      }}
                    >
                      {convertToArray(listSubject).map((e, key) => (
                        <Option key={key} value={e.Id}>
                          {e.Name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Người dạy"} name={"TeacherId"} className="req">
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listTeacher).map((e, key) => (
                        <Option key={key} value={e.Id}>
                          {e.Fullname}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Số lượng hs"} name={"Capacity"} className="req">
                    <InputNumber
                      className="input-number--modify"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={2}
                    />
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

export default ClassRoom;
