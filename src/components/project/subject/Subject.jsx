import React, { useState, useEffect, useContext } from "react";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Input, Form, Tooltip, Button, Popconfirm, Table, message, Select, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import Modal from "react-bootstrap/Modal";
import { useGlobalConst } from "../../apiCore/useGlobalConst";
import moment from "moment";
import { toast } from "react-toastify";

const { Option } = Select;

const Subject = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const [selectedRow, setSelectedRow] = useState(false);
  const [checkFinish, setCheckFinish] = useState(false);
  const [listParent, setlistParent] = useState([]);
  const [show, setShow] = useState(false);
  const globalConst = useGlobalConst(t);

  const handleClose = () => setShow(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const handleShow = (autoId) => {
    setRecordToDelete(autoId);
    setShow(true);
  };

  useEffect(() => {
    AxiosAPI.getParentGetList()
      .then((res) => {
        if (res.status === 200) {
          setlistParent(convertToArray(res?.data?.Data));
        } else {
          setlistParent([]);
        }
      })
      .catch(function (err) {
        setlistParent([]);
      });
  }, []);

  const columns = [
    {
      title: t("Tên Môn"),
      dataIndex: "Name",
      key: "Name",
      align: "center",
    },
    {
      title: t("Mô tả môn học"),
      dataIndex: "Description",
      key: "Description",
      align: "center",
    },
    {
      title: t("Giá môn học"),
      dataIndex: "CurrentPrice",
      key: "CurrentPrice",
      align: "center",
    },
    {
      title: t("Tổng số buổi"),
      dataIndex: "TotalSlot",
      key: "TotalSlot",
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
  ];
  useEffect(() => {
    handleGetLisDigitalSignature();
  }, []);

  const handleGetLisDigitalSignature = () => {
    AxiosAPI.getSubjectGetList()
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
    const subjectLevelString = (() => {
        switch (record?.SubjectLevel) {
          case 1:
            return "Khối 6";
          case 2:
            return "Khối 9";
          default:
            return record?.SubjectLevel;
        }
      })();

    formCASign.setFieldsValue({
      Id: record?.Id,
      Description: record?.Description,
      CurrentPrice: record?.CurrentPrice,
      TotalSlot: record?.TotalSlot,
      SubjectType: subjectTypeString,
      SubjectLevel: subjectLevelString,
      Name: record?.Name,
    });
  };

  const handleAddDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const name = formCASign.getFieldValue("Name");
        const newData = {
          name: name,
          description: values?.Description,
          currentPrice: values?.CurrentPrice,
          totalSlot: values?.TotalSlot,
          subjectType: values?.SubjectType,
          subjectLevel: values?.SubjectLevel,
          isDeleted: 0,
        };
        if (values) {
          const response = await axios.post("/api/Subject/Insert", newData);

          if (response.data?.StatusCode >= 0) {
            toast.success("Thành công!");
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            toast.error("Thất bại!");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          toast.error("Thất bại!");
        }
      });
  };
  const handleEditDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const name = formCASign.getFieldValue("Name");
console.log(values,"llllllllllllllllllllllllll");
        const newData = {
          ...values,
          name: name,
          SubjectType: values?.SubjectType === "Toán" ? "0" : values?.SubjectType === "Văn" ? "1" : values?.SubjectType === "Tiếng Anh" ? "2" : values?.SubjectType,
          SubjectLevel: values?.SubjectLevel === "Khối 6" ? "1" : values?.SubjectLevel === "Khối 9" ? "2" : values?.SubjectLevel 
        };
        if (values) {
          const response = await axios.post("/api/Subject/Update", newData);

          if (response.data?.StatusCode >= 0) {
            toast.success("Thành công!");
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
           toast.error("Thất bại!");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
         toast.error("Thất bại!");
        }
      });
  };
  const handleDelete = (autoId) => {
    axios
      .post(`/api/Subject/Delete?id=${autoId}`)
      .then((response) => {
        if (response.status === 200 && response.data.StatusCode >= 0) {
          toast.success("Thành công!");
        } else {
          toast.error("Thất bại!");

        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error("Thất bại!");
        }
      })
      .finally(() => {
        handleGetLisDigitalSignature();
        formCASign.resetFields();
      });
  };

  const updateNameFieldValue = () => {
    const subjectType = formCASign.getFieldValue("SubjectType");
    const subjectLevel = formCASign.getFieldValue("SubjectLevel");

    let name;
    if (subjectType === "0") {
      name = "Toán";
    } else if (subjectType === "1") {
      name = "Văn";
    } else if (subjectType === "2") {
      name = "Tiếng Anh";
    }

    if (subjectLevel === "1") {
      name += " khối 6";
    } else if (subjectLevel === "2") {
      name += " khối 9";
    }

    formCASign.setFieldsValue({ Name: name });
  };
  const handleFinishForm = () => {
    formCASign.validateFields().then((values) => {});
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Subject</h1>
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
              <div className="heading v1 text-center">Subject</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item label={"Môn"} name={"SubjectType"} className="req">
                    <Select className="select--modify" placeholder="Choose" onChange={updateNameFieldValue}>
                      <Option value="0">Toán</Option>
                      <Option value="1">Văn</Option>
                      <Option value="2">Tiếng Anh</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Khối"} name={"SubjectLevel"} className="req">
                    <Select className="select--modify" placeholder="Choose" onChange={updateNameFieldValue}>
                      <Option value="1">Khối 6</Option>
                      <Option value="2">Khối 9</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Mô tả môn học"} name={"Description"} className="req">
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Giá"} name={"CurrentPrice"} className="req">
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Số buổi học"} name={"TotalSlot"} className="req">
                    <InputNumber
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={3}
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4"></div>
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

export default Subject;
