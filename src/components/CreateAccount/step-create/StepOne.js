import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { convertToArray } from "../../apiCore/convertObject";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
const { Option } = Select;

const StepOne = ({ formData, next, setFormData }) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();

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
      <Form id="form" className="form" form={formCASign}>
        <div className="ant-form-createacc">
          <Form.Item label={"Họ và Tên"} name={"Fullname"} className="req">
            <Input />
          </Form.Item>
          <Form.Item label={"Ngày sinh"} name={"Dob"} className="req">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleNextForm}>
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
