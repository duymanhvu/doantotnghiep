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
      title: t("Lớp"),
      dataIndex: "ClassId",
      key: "ClassId",
      align: "center",
    },
    {
      title: t("Phòng học"),
      dataIndex: "ClassroomNo",
      key: "ClassroomNo",
      align: "center",
    },
    // {
    //   title: t("Ngày bắt đầu"),
    //   dataIndex: "StartDate",
    //   key: "StartDate",
    //   align: "center",
    // },
    // {
    //   title: t("Ngày kết thúc"),
    //   dataIndex: "EndDate",
    //   key: "EndDate",
    //   align: "center",
    // },
    {
      title: t("Môn Học"),
      dataIndex: "SubjectId",
      key: "SubjectId",
      align: "center",
      render: (text)=> {
        const name = listSubject?.find(e => e.Id === text)?.Name
        return <span>
          {name}
        </span>
      }
    },
    {
      title: t("Thầy dạy"),
      dataIndex: "teacherName",
      key: "teacherName",
      align: "center",
    },
    {
      title: t("Số lượng học sinh"),
      dataIndex: "Capacity",
      key: "Capacity",
      align: "center",
      // render: (value) => {
      //   switch (value) {
      //     case 0:
      //       return "Toán";
      //     case 1:
      //       return "Văn";
      //     case 2:
      //       return "Tiếng Anh";
      //     default:
      //       return value;
      //   }
      // },
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
    AxiosAPI.getClassRoomGetList123()
      .then((res) => {
        if (res.status === 200) {
          setListData(convertToArray(res?.data?.Data).map((item) => ({
            ...item,
            teacherName: item.Teacher.Fullname,
            ClassId: `A${item.Id}`
          }))
        );
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
    formCASign.setFieldsValue({
      Id: record?.Id,
      ClassroomNo: record?.ClassroomNo,
      StartDate: record?.StartDate,
      EndDate: record?.EndDate,
      SubjectId: record?.SubjectId,
      TeacherId: record?.TeacherId,
      Capacity: record?.Capacity,
    });
  };

  const handleAddDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          classroomNo: values?.ClassroomNo,
          startDate: values?.StartDate,
          endDate: values?.EndDate,
          subjectId: values?.SubjectId,
          teacherId: values?.TeacherId,
          capacity: values?.Capacity,
          status: true,
        };
        if (values) {
          const response = await axios.post("/api/Classroom/Insert", newData);
          if (response.data?.StatusCode > 0) {
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
          const response = await axios.post("/api/Classroom/Update", newData);
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
      .post(`/api/Classroom/Delete?id=${autoId}`)
      .then((response) => {
        if (response.status === 200 && response.data.StatusCode > 0) {
          toast.success("Xóa thành công!");
        } else {
          toast.error("Xóa thất bại!");
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
            <h1 className="animate__animated animate__fadeInUp">Lớp học</h1>
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
              <div className="heading v1 text-center">Lớp học</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item label={"Tên Phòng"} name={"ClassroomNo"} className="req">
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listRoom).map((e, key) => (
                        <Option key={key} value={e.Value}>
                          {e.Value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* <div className="col-lg-4">
                  <Form.Item label={"Ngày bắt đầu"} name={"StartDate"} className="req">
                    <Input type="date" />
                  </Form.Item>
                </div>

                <div className="col-lg-4">
                  <Form.Item label={"Ngày kết thúc"} name={"EndDate"} className="req">
                    <Input type="date" />
                  </Form.Item>
                </div> */}
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
                  // dataSource={[]}
                  dataSource={listData.map((e, i) => ({
                    ...e,
                    key: e?.autoId,
                  }))}
                  pagination={true}
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
