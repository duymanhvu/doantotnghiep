import React, { useState, useEffect, useContext } from "react";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Input, Form, Tooltip, Button, Popconfirm, Table, Checkbox, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import Modal from "react-bootstrap/Modal";
import { useGlobalConst } from "../../apiCore/useGlobalConst";
import moment from "moment";
import { notification } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;

const makeid = () => {
  return parseInt(new Date().getTime());
};

const ThoiKhoaBieu = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const [selectedRow, setSelectedRow] = useState(false);
  const [checkFinish, setCheckFinish] = useState(false);
  const [listClassRoom, setListClassRoom] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const globalConst = useGlobalConst(t);

  const handleClose = () => setShow(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const handleShow = (autoId) => {
    setRecordToDelete(autoId);
    setShow(true);
  };

  useEffect(() => {
    AxiosAPI.getClassRoomGetList123()
      .then((res) => {
        if (res.status === 200) {
          setListClassRoom(convertToArray(res?.data?.Data));
        } else {
          setListClassRoom([]);
        }
      })
      .catch(function (err) {
        setListClassRoom([]);
      });
  }, []);

  const columns = [
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
    {
      title: t("Ngày bắt đầu"),
      dataIndex: "StartDate",
      key: "StartDate",
      align: "center",
      render: (text) => {
        const name = moment(text).format("DD-MM-YYYY");
        return <span>{name}</span>;
      },
    },
    {
      title: t("Ngày kết thúc"),
      dataIndex: "EndDate",
      key: "EndDate",
      align: "center",
      render: (text) => {
        const name = moment(text).format("DD-MM-YYYY");
        return <span>{name}</span>;
      },
    },
    {
      title: t("Môn học"),
      dataIndex: "SubjectId",
      key: "SubjectId",
      align: "center",
    },
    {
      title: t("Thầy dạy"),
      dataIndex: "TeacherId",
      key: "TeacherId",
      align: "center",
    },
    {
      title: t("Thời gian học"),
      dataIndex: "SlotName",
      key: "SlotName",
      align: "center",
      width: "300px",
    },
    {
      title: t("Số lượng học sinh"),
      dataIndex: "Capacity",
      key: "Capacity",
      align: "center",
    },

    {
      title: t("Chức năng"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="d-flex justify-content-center align-items-center">
          {/* <div onClick={() => handleEditClick(record)}>
            <img src="/ic_edit.svg" alt="img" />
          </div> */}
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

  const showDuplicateDayNotification = () => {
    toast.error("Thứ đã bị trùng, vui lòng chọn ngày khác !");
  };

  const handleGetLisDigitalSignature = () => {
    const params = {
      pageSize: 1000,
      pageIndex: 1,
      sortBy: "Id",
      orderBy: "desc",
      keyword: "",
      classId: "",
      subjectId: [],
      teacherId: [],
      dayNumber: [],
      startDate: "",
      endDate: "",
    };
    axios
      .post("/api/Schedule/GetSchedules", params)
      .then((res) => {
        if (res.data?.StatusCode > 0) {
          setListData(
            convertToArray(res.data?.Data).map((item) => ({
              ...item,
              SubjectId: item.Subject.Name,
              TeacherId: item.Teacher.Fullname,
              Price: item.Subject.CurrentPrice,
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
      Fullname: record?.Fullname,
      Dob: moment(record?.Dob).format("YYYY-MM-DD"),
      Email: record?.Email,
      Password: record?.Password,
      ParentId: record?.ParentId,
      IsDeleted: record?.IsDeleted,
    });
  };

  const handleAddDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()

      .then(async (values) => {
        const classId = values?.classId;
        const startDate = values?.startDate;
        const newData = values?.scheduleList;
        if (values) {
          const response = await axios.post(`/api/Schedule/CreateSchedules?classId=${classId}&startDate=${startDate}`, newData);

          if (response.data?.StatusCode > 0) {
            toast.success("Processing complete!");
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            toast.error(response?.data?.ErrorMessage);
          }
        }
      })
      .catch((err) => {
        if (err.response.config.data && err.response.config.data !== undefined) {
          toast.error(err.response.data.title);
        }
      });
  };
  // const handleEditDigitalSignature = async () => {
  //   formCASign.submit();
  //   formCASign
  //     .validateFields()
  //     .then(async (values) => {
  //       const newData = {
  //         ...values,
  //         dob: moment(values?.Dob).format("YYYY-MM-DDTHH:mm:ss"),
  //       };
  //       if (values) {
  //         const response = await axios.post("/api/Student/Update", newData);

  //         if (response.data?.errorCode >= 0) {
  //           notificationShare(0, response.data?.StatusCode, t("thanhCong"));

  //           handleGetLisDigitalSignature();
  //           formCASign.resetFields();
  //           setSelectedRow(false);
  //           setCheckFinish(!checkFinish);
  //         } else {
  //           notificationShare(-1, response.data?.StatusCode, t("thatBai"));
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response !== undefined) {
  //         notificationShare(-1, err.response?.data?.StatusCode, t("thatBai"));
  //       }
  //     });
  // };
  const handleDelete = (autoId) => {
    axios
      .post(`/api/Schedule/DeleteSchedules?classId=${autoId}`)
      .then((response) => {
        if (response.status === 200 && response.data.errorCode >= 0) {
          toast.error("Xóa thành công");
        } else {
          toast.error("Xóa thất bại");
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.response && err.response.data) {
          toast.error("Xóa thất bại");
        }
      })
      .finally(() => {
        handleGetLisDigitalSignature();
        formCASign.resetFields();
      });
  };
  const handleDeleteSchedule = (item) => {
    const { scheduleList } = formCASign.getFieldsValue();
    formCASign.setFieldValue(
      "scheduleList",
      convertToArray(scheduleList).filter((value, i) => value?.autoId !== item?.autoId)
    );
  };
  const LichThu = [
    { value: "1", content: "Thứ Hai" },
    { value: "2", content: "Thứ Ba" },
    { value: "3", content: "Thứ Tư" },
    { value: "4", content: "Thứ Năm" },
    { value: "5", content: "Thứ Sáu" },
    { value: "6", content: "Thứ Bảy" },
    { value: "0", content: "Chủ Nhật" },
  ];
  const handleChangeFormValues = (changedValues, allValues) => {};

  const ScheduleForm = ({ item, index, onClick, getFieldsValue }) => {
    const { scheduleList } = getFieldsValue();

    return (
      <div className="row" key={index}>
        <div className="col-lg-4">
          <Form.Item label="Thứ" name={["scheduleList", index, "dayInWeek"]} className="req">
            <Select
              onChange={(e) => {
                if (convertToArray(scheduleList).filter((value) => value.dayInWeek === e).length > 0) {
                  showDuplicateDayNotification();

                  formCASign.setFieldValue(
                    "scheduleList",
                    scheduleList.map((value, key) => {
                      if (key === index) {
                        return {
                          ...value,
                          dayInWeekL: undefined,
                        };
                      }
                      return {
                        ...value,
                      };
                    })
                  );
                  setIsLoad(!isLoad);
                }
              }}
            >
              {LichThu.map((item, key) => {
                return (
                  <Option value={item?.value} key={key}>
                    {item?.content}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="col-lg-4">
          <Form.Item label="Ca học" name={["scheduleList", index, "slot"]} className="req">
            <Select>
              <Option value="0">Ca 1</Option>
              <Option value="1">Ca 2</Option>
              <Option value="2">Ca 3</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="col-lg-4">
          <Button type="danger" onClick={() => handleDeleteSchedule(item)}>
            Xóa
          </Button>
        </div>
      </div>
    );
  };
  const handleFinishForm = () => {
    formCASign.validateFields().then((values) => {});
  };
  const handleAddRow = (getFieldsValue) => {
    const { scheduleList } = getFieldsValue || {};
    if (convertToArray(scheduleList).length === 0) {
      formCASign.setFieldValue("scheduleList", [{ dayInWeek: undefined, slot: undefined, autoId: makeid() }]);
    } else {
      formCASign.setFieldValue("scheduleList", [...scheduleList, { dayInWeek: undefined, slot: undefined, autoId: makeid() }]);
    }
  };
  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Schedule</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>
        <Form id="form" className="form" form={formCASign} onFinish={handleFinishForm} onValuesChange={handleChangeFormValues}>
          <div className="registration__form">
            <div className="registration__form-wrap">
              <div className="heading v1 text-center">Schedule</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <Form.Item name={"scheduleList"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item label={"Lớp học"} name={"classId"} className="req">
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listClassRoom).map((e, key) => (
                        <Option key={key} value={e.Id}>
                          {`${e.ClassroomNo} - ${`A${e.Id}`} - ${e.Subject.Name} - ${e.Teacher.Fullname}`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Ngày bắt đầu"} name={"startDate"} className="req">
                    <Input type="date" />
                  </Form.Item>
                </div>

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues?.scheduleList !== currentValues?.scheduleList}>
                  {({ getFieldValue, getFieldsValue }) => {
                    let scheduleData = convertToArray(getFieldValue("scheduleList"));
                    return (
                      <>
                        <div className="col-lg-4">
                          <Button type="primary" onClick={() => handleAddRow(getFieldsValue())}>
                            Tạo lịch học
                          </Button>
                        </div>
                        {scheduleData.map((item, index) => (
                          <ScheduleForm item={item} key={index} index={index} getFieldsValue={getFieldsValue} />
                        ))}
                      </>
                    );
                  }}
                </Form.Item>
                {/* {scheduleData.map((item, index) => (
                  <ScheduleForm item={item} key={index} index={index} onClick={(index) => setScheduleList(scheduleList.filter((_, i) => i !== index))} />
                ))} */}
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <Form.Item label={"Thao tác"} className="req">
                    <button className="btn btn-action" type="submit" onClick={handleAddDigitalSignature}>
                      {<span>{t("Thêm")}</span>}
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
                  pagination={true}
                  // scroll={{
                  //   x: "100%",
                  // }}
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

export default ThoiKhoaBieu;
