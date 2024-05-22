import { Button, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import { MapColumnsANT } from "../../apiCore/dataSetCollection";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import moment from "moment";
const { Option } = Select;
const makeid = () => {
  return parseInt(new Date().getTime());
};
const StepTwo = ({ formData, next, setFormData, student, prev, formCASign, setStudent,listTeacher,listSubject,listSchedule }) => {
  const { t } = useTranslation();
  const axios = useAxios();
  const [listData, setListData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const parentId = localStorage.getItem("ID");
 
  const columns = MapColumnsANT([
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
      title: t("Giá khóa học"),
      dataIndex: "Price",
      key: "Price",
      align: "center",
    },
  ]);
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      handleAddStudent()
      const data = { ...formData, ...values,};
      setFormData(data);
      next();
    });
  };
  const handleGetListTeacher = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          pageSize: 1000,
          pageIndex: 1,
          sortBy: "Id",
          orderBy: "desc",
          keyword: "",
          classId: "",
          subjectId: values?.subjectId ? values?.subjectId : [],
          teacherId: values?.teacherId ? values?.teacherId : [],
          dayNumber: values?.dayNumber ? values?.dayNumber : [],
          startDate: "",
          endDate: "",
        };
        if (values) {
          const response = await axios.post("/api/Schedule/GetSchedules", newData);
          if (response.data?.StatusCode > 0) {
            setListData(
              convertToArray(response.data?.Data).map((item) => ({
                ...item,
                SubjectId: item.Subject.Name,
                TeacherId: item.Teacher.Fullname,
                Price: item.Subject.CurrentPrice,
              }))
            );
            toast.success("Complete!");
          } else {
            toast.error("Error!");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          toast.error("Error!");
        }
      });
  };
  const showDuplicateDayNotification = () => {
    toast.error("Lớp học đã bị trùng, vui lòng chọn ngày khác !");
  };
  const handleDeleteSchedule = (item) => {
    const { scheduleList } = formCASign.getFieldsValue();
    formCASign.setFieldValue(
      "scheduleList",
      convertToArray(scheduleList).filter((value, i) => value?.autoId !== item?.autoId)
    );
  };
  const handleChangeFormValues = (changedValues, allValues) => {
  };
  const handleAddStudent = async () => {

      const params = {
        fullname: formData?.Fullname,
          dob: moment(formData?.Dob).format("YYYY-MM-DDTHH:mm:ss"),
          parentId: Number(parentId),
          email: "",
          password: "",
          isDeleted: false,
      };
      console.log(params, "paramsparamsparamsparams");
      axios
        .post("/api/Student/Insert", params)
        .then((response) => {
          if (response.data?.StatusCode > 0) {
            console.log("responseresponseresponse");
            setStudent(response.data.Id);
          } else {
            toast.error("Thất bại!");
          }
        })
        .catch((err) => {
          if (err.response && err.response !== undefined) {
            toast.error("Thất bại!");
          }
        });
  };
  const ScheduleForm = ({ item, index, onClick, getFieldsValue }) => {
    const { scheduleList } = getFieldsValue();

    return (
      <div className="row" key={index}>
        <div className="col-lg-4">
          <Form.Item name={["scheduleList", index, "autoId"]} hidden />
          <Form.Item label="Lịch học" name={["scheduleList", index, "subject"]} className="req">
            <Select allowClear
              onChange={(e) => {
                
                if (convertToArray(scheduleList).filter((value) => value.subject === e).length > 0) {
                  showDuplicateDayNotification();

                  formCASign.setFieldValue(
                    "scheduleList",
                    scheduleList.map((value, key) => {
                      if (key === index) {
                        return {
                          ...value,
                          subject: undefined,
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
              {convertToArray(listSchedule).map((item, key) => {
                return (
                  <Option value={item?.Id} key={key}>
                    {`${item?.ClassroomNo} - ${item?.Subject?.Name}`}
                  </Option>
                );
              })}
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
  const handleAddRow = (getFieldsValue) => {
    const { scheduleList } = getFieldsValue || {};
    if (convertToArray(scheduleList).length === 0) {
      formCASign.setFieldValue("scheduleList", [{ subject: undefined, teacher: undefined, autoId: makeid() }]);
    } else {
      formCASign.setFieldValue("scheduleList", [...scheduleList, { subject: undefined, teacher: undefined, autoId: makeid() }]);
    }
  };
  return (
    <>
      <h3 className="">Tìm lịch học phù hợp</h3>
      {/* <Form id="form" className="form" form={formCASign} onValuesChange={handleChangeFormValues}> */}
      <div className="ant-form-createacc">
        <Form.Item label={"Tìm Giáo Viên"} name={"teacherId"} className="req">
          <Select className="select--modify" placeholder="Choose" allowClear mode="multiple">
            {convertToArray(listTeacher).map((e, key) => (
              <Option key={key} value={e.Id}>
                {e.Fullname}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={"Tìm Môn Học"} name={"subjectId"} className="req">
          <Select className="select--modify" placeholder="Choose" mode="multiple" allowClear>
            {convertToArray(listSubject).map((e, key) => (
              <Option key={key} value={e.Id}>
                {e.Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={"Tìm thứ"} name={"dayNumber"} className="req">
          <Select className="select--modify" placeholder="Choose" mode="multiple" allowClear>
            <Option value={1}>thứ 2</Option>
            <Option value={2}>thứ 3</Option>
            <Option value={3}>thứ 4</Option>
            <Option value={4}>thứ 5</Option>
            <Option value={5}>thứ 6</Option>
            <Option value={6}>thứ 7</Option>
            <Option value={0}>CN</Option>
          </Select>
        </Form.Item>
        <div className="col-lg-4">
          <Form.Item label={"Thao tác"} className="req">
            <button className="btn btn-action" type="submit" onClick={handleGetListTeacher}>
              {<span>{t("Tìm kiếm")}</span>}
            </button>
          </Form.Item>
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
            scroll={{
              x: "100%",
            }}
          />
          {/* <Pagination defaultCurrent={1} total={50} /> */}
        </div>
        <h3 className="">Chọn lịch học phù hợp</h3>
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues?.scheduleList !== currentValues?.scheduleList}>
          {({ getFieldValue, getFieldsValue }) => {
            let scheduleData = convertToArray(getFieldValue("scheduleList"));
            return (
              <>
                <div className="col-lg-4">
                  <Button type="primary" onClick={() => handleAddRow(getFieldsValue())}>
                    Chọn thêm lịch học
                  </Button>
                </div>
                {scheduleData.map((item, index) => (
                  <ScheduleForm item={item} key={index} index={index} getFieldsValue={getFieldsValue} />
                ))}
              </>
            );
          }}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleNextForm}>
            Tiếp theo
          </Button>
          <Button type="primary" onClick={prev}>
            Quay lại
          </Button>
        </Form.Item>
        
      </div>
      {/* </Form> */}
    </>
  );
};

export default StepTwo;
