import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { convertToArray } from "../../apiCore/convertObject";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
const { Option } = Select;

const StepTwo = ({ formData }) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
console.log(formData ,"{ formData }{ formData }{ formData }");
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
      <h3 className="">Chọn lịch học phù hợp</h3>
      <div className="ant-form-createacc">
        <Form.Item label={"Chọn Giáo Viên"} name={"SubjectType"} className="req">
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
      </div>
    </>
  );
};

export default StepTwo;
