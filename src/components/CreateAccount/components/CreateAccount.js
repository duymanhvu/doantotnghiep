/** @format */

import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { ExportContentMoDau, ExportContentSuccess } from "../creactContentInfo";

import { Button, Checkbox, Form, Input, Modal, Select, Steps, message } from "antd";
import { useGlobalConst } from "../../apiCore/useGlobalConst";
import { useNavigate } from "react-router-dom";
import StepOne from "../step-create/StepOne";
import StepTwo from "../step-create/StepTwo";

const CreateAccount = () => {
  const history = useNavigate();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState([]);
  const globalConst = useGlobalConst();
  const handleFormData = (data) => {
    setFormData(data);  
  };
  console.log(formData,"datadatadatadatadatadata");
  const steps = [
    {
      title: "Thông tin cá nhân",
      content: <StepOne handleFormData={handleFormData}/>,
    },
    {
      title: "Lịch học",
      content: <StepTwo formData={formData}/>,
    },
    {
      title: "Xác nhận",
      content: "Thanh Toán",
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="form-login">
      <div className="form-comfirm">
        <Steps current={current} items={items} />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success("Processing complete!")}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
