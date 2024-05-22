/** @format */

import React, { useEffect, useState } from "react";

import { Button, Steps, message } from "antd";
import StepOne from "../step-create/StepOne";
import StepTwo from "../step-create/StepTwo";
import Step3 from "../step-create/Step3";

const CreateAccount = () => {
  const [formData, setFormData] = useState({});
  const [student, setStudent] = useState({});
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
    
  }, [formData]);
  console.log(formData,"console.log(formData);console.log(formData);");
  const steps = [
    {
      title: "Thông tin cá nhân",
      content: (
        <StepOne formData={formData} next={next} setFormData={setFormData} student={student} setStudent={setStudent}/>
      ),
    },
    {
      title: "Lịch học",
      content: (
        <StepTwo formData={formData} next={next} prev={prev} setFormData={setFormData} student={student}/>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <Step3 formData={formData} next={next} prev={prev} setFormData={setFormData} student={student}/>
      ),
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
          */}
          {/* {current > 0 && (
            <Button
              onClick={() => prev()}
              // className="form-button"
            >
              Previous
            </Button>
          )}  */}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
