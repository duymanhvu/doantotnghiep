import React, { useState, useEffect, useContext } from "react";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Input, Form, Tooltip, Button, Popconfirm, Table, Checkbox, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";
import { useAxios } from "../../apiCore/apiHelper";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { toast } from "react-toastify";

const { Option } = Select;

const DanhSachHS = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const [listClass, setListClass] = useState([]);
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  

  const columns = [
    {
      title: t("Học Sinh"),
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    // {
    //   title: t("Môn"),
    //   dataIndex: "Dob",
    //   key: "Dob",
    //   align: "center",
    // },
    // {
    //   title: t("Học Sinh"),
    //   dataIndex: "ParentId",
    //   key: "ParentId",
    //   align: "center",
    // },
  ];
  useEffect(() => {
    axios
      .get(`/api/Schedule/GetSchedulesByTime?pageSize=100000&pageIndex=1`)
      .then((response) => {
        if (response.data?.StatusCode > 0) {
            setListClass(convertToArray(response?.data?.Data).map((item) => ({
              classroomId: item?.Classroom?.Id,
            })).filter((item, index, arr) =>
              arr.findIndex((obj) => obj.classroomId === item.classroomId) === index
            ));
        } else {
          toast.error("Thất bại!");
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          toast.error("Thất bại!");
        }
      });
  }, []);
  console.log(listData,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  const handleGetListTeacher = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        console.log(values,"valuesvaluesvaluesvaluesvalues");
        const newData = values.TeacherId
        if (values) {
          const response = await axios.get(`/api/Student/GetStudentByClass?classId=${newData}` );
          if (response.data?.StatusCode > 0) {
            setListData(
              convertToArray(response.data?.Data).map((item) => ({
                ...item,
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

  const handleFinishForm = () => {
    formCASign.validateFields().then((values) => {});
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Danh sách học sinh</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>Kéo Xuống</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>
        <Form id="form" className="form" form={formCASign} onFinish={handleFinishForm}>
          <div className="registration__form">
            <div className="registration__form-wrap">
              <div className="heading v1 text-center">Thông tin học sinh</div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                <Form.Item label={"Lớp dạy"} name={"TeacherId"} className="req">
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listClass).map((e, key) => (
                        <Option key={key} value={e.classroomId}>
                          {`A${e.classroomId}`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
          <Form.Item label={"Thao tác"} className="req">
            <button className="btn btn-action" type="submit" onClick={handleGetListTeacher}>
              {<span>{t("Tìm kiếm")}</span>}
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
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DanhSachHS;
