import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray } from "../../apiCore/convertObject";
const { Option } = Select;

const StepTwo = ({ formData, next, setFormData }) => {
  const { t } = useTranslation();
  const [formCASign] = Form.useForm();
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
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      // next();
    });
  };
  return (
    <>
      <h3 className="">Chọn lịch học phù hợp</h3>
      <Form id="form" className="form" form={formCASign}>
        <div className="ant-form-createacc">
          <Form.Item
            label={"Chọn Giáo Viên"}
            name={"SubjectType"}
            className="req"
          >
            <Select className="select--modify" placeholder="Choose">
              <Option value="0">Lớp A</Option>
              <Option value="1">Lớp B</Option>
              <Option value="3">Lớp C</Option>
            </Select>
          </Form.Item>
          <Form.Item label={"Chọn Môn Học"} name={"Dob"} className="req">
            <Input type="date" />
          </Form.Item>
          <Form.Item label={"Chọn thứ"} name={"SubjectType"} className="req">
            <Select className="select--modify" placeholder="Choose">
              <Option value="0">thú 2</Option>
              <Option value="1">thú 3</Option>
              <Option value="2">thú 4</Option>
              <Option value="3">thú 5</Option>
              <Option value="4">thú 6</Option>
              <Option value="5">thú 7</Option>
              <Option value="6">CN</Option>
            </Select>
          </Form.Item>
          <Form.Item label={"Ca"} name={"SubjectType"} className="req">
            <Select className="select--modify" placeholder="Choose">
              <Option value="0">CA 1</Option>
              <Option value="1">Ca 2</Option>
              <Option value="3">Ca3</Option>
            </Select>
          </Form.Item>

          <Form.Item label={"Ngày"} name={"SubjectType"} className="req">
            <Select className="select--modify" placeholder="Choose">
              <Option value="0">thú 2</Option>
              <Option value="1">thú 3</Option>
              <Option value="2">thú 4</Option>
              <Option value="3">thú 5</Option>
              <Option value="4">thú 6</Option>
              <Option value="5">thú 7</Option>
              <Option value="5">CN</Option>
            </Select>
          </Form.Item>
          <Form.Item label={"Ca"} name={"SubjectType"} className="req">
            <Select className="select--modify" placeholder="Choose">
              <Option value="0">CA 1</Option>
              <Option value="1">Ca 2</Option>
              <Option value="3">Ca3</Option>
            </Select>
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

export default StepTwo;
