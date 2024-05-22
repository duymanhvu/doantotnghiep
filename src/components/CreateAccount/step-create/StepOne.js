import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAxios } from "../../apiCore/apiHelper";
import { useShareOrderApi } from "../../apiCore/apiProcess";
const { Option } = Select;

const StepOne = ({
  formData,
  next,
  setFormData,
  student,
  setStudent,
  formCASign,
}) => {
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      next();
    });
  };

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
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleNextForm}>
            Tiếp theo
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default StepOne;
