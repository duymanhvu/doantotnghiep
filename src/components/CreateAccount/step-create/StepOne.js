import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAxios } from "../../apiCore/apiHelper";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray } from "../../apiCore/convertObject";
import { Link } from "react-router-dom";
const { Option } = Select;

const StepOne = ({ formData, next, setFormData, student, setStudent, formCASign }) => {
  const [listData, setListData] = useState([]);
  const AxiosAPI = useShareOrderApi();
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      next();
    });
  };
  useEffect(() => {
    AxiosAPI.getStudentGetList()
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
  }, []);
  return (
    <>
      <h3 className="">Chọn con muốn đăng ký</h3>

      <div className="ant-form-createacc">
        <Form.Item label={"Chọn Con Đăng Ký"} name={"studentId"} className="req">
          <Select className="select--modify" placeholder="Choose"  mode="single">
            {convertToArray(listData).map((e, key) => (
              <Option key={key} value={e.Id}>
                {e.Fullname}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleNextForm}>
            Tiếp theo
          </Button>
        </Form.Item>
        <Link to="/home">Quay lại trang chủ</Link>
      </div>
    </>
  );
};

export default StepOne;
