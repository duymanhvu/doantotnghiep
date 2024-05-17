/** @format */

import React, { useEffect, useState } from "react";

import { Button, Steps, message } from "antd";
import StepOne from "../step-create/StepOne";
import StepTwo from "../step-create/StepTwo";

const CreateAccount = () => {
  const [formData, setFormData] = useState({});
  const [current, setCurrent] = useState(0);
  const handleFormData = (data) => {
    setFormData(data);
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const steps = [
    {
      title: "Thông tin cá nhân",
      content: (
        <StepOne formData={formData} next={next} setFormData={setFormData} />
      ),
    },
    {
      title: "Lịch học",
      content: (
        <StepTwo formData={formData} next={next} setFormData={setFormData} />
      ),
    },
    {
      title: "Xác nhận",
      content: "Thanh Toán",
    },
  ];

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
          {/* {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
