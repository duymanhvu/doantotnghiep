import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { convertToArray } from "../../apiCore/convertObject";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
const { Option } = Select;

const StepOne = () => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();

  const [listParent, setlistParent] = useState([]);
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
  return (
    <>
      <h3 className="">Nhập thông tin của con</h3>
      <div className="ant-form-createacc">
        <Form.Item label={"Họ và Tên"} name={"Fullname"} className="req">
          <Input />
        </Form.Item>
        <Form.Item label={"Ngày sinh"} name={"Dob"} className="req">
          <Input type="date" />
        </Form.Item>
        <Form.Item label={"Lớp"} name={"SubjectType"} className="req">
          <Select className="select--modify" placeholder="Choose">
            <Option value="0">Lớp 6</Option>
            <Option value="1">Lớp 9</Option>
          </Select>
        </Form.Item>
        <Form.Item label={"Môn học"} name={"SubjectType"} className="req">
          <Select className="select--modify" placeholder="Choose">
            <Option value="0">Toán</Option>
            <Option value="1">Văn</Option>
            <Option value="2">Tiếng Anh</Option>
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default StepOne;
