/** @format */

import React, { useEffect, useState } from "react";

import { Button, Form, Steps, message } from "antd";
import StepOne from "../step-create/StepOne";
import StepTwo from "../step-create/StepTwo";
import Step3 from "../step-create/Step3";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray } from "../../apiCore/convertObject";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [student, setStudent] = useState({});
  const [current, setCurrent] = useState(0);
  const [listTeacher, setlistTeacher] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listSchedule, setListSchedule] = useState([]);

  const handleFormData = (data) => {
    setFormData(data);
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {}, [formData]);
  useEffect(() => {
    AxiosAPI.getListTeacherAll()
      .then((res) => {
        if (res.status === 200) {
          setlistTeacher(convertToArray(res?.data?.Data));
        } else {
          setlistTeacher([]);
        }
      })
      .catch(function (err) {
        setlistTeacher([]);
      });
    AxiosAPI.getListSubjectAll()
      .then((res) => {
        if (res.status === 200) {
          setListSubject(convertToArray(res?.data?.Data));
        } else {
          setListSubject([]);
        }
      })
      .catch(function (err) {
        setListSubject([]);
      });
    AxiosAPI.getThoiKhoaBieu()
      .then((res) => {
        if (res.status === 200) {
          setListSchedule(convertToArray(res?.data?.Data));
        } else {
          setListSchedule([]);
        }
      })
      .catch(function (err) {
        setListSchedule([]);
      });
  }, []);
  const steps = [
    {
      title: "Thông tin cá nhân",
      content: <StepOne formData={formData} next={next} setFormData={setFormData} formCASign={formCASign} />,
    },
    {
      title: "Lịch học",
      content: <StepTwo formData={formData} next={next} prev={prev} setFormData={setFormData} student={student} setStudent={setStudent} formCASign={formCASign} listTeacher={listTeacher} listSubject={listSubject} listSchedule={listSchedule} />,
    },
    {
      title: "Xác nhận",
      content: <Step3 formData={formData} next={next} prev={prev} setFormData={setFormData} student={student} setStudent={setStudent} formCASign={formCASign} listSchedule={listSchedule} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="form-login">
      <div className="form-comfirm">
        <Form id="form" className="form" form={formCASign}>
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
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
