import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { toast } from "react-toastify";
import moment from "moment";
import { useAxios } from "../../apiCore/apiHelper";
const { Option } = Select;

const StepOne = ({ formData, next, setFormData,student,setStudent}) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const [isAddStudentSuccessful, setIsAddStudentSuccessful] = useState(false); 
  const parentId = localStorage.getItem("ID")
  console.log(parentId,"kkkkkkkkkkkkkkkkkkkkkkkk");
  const [listParent, setlistParent] = useState([]);
  // useEffect(() => {
  //   AxiosAPI.getParentGetList()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setlistParent(convertToArray(res?.data?.Data));
  //       } else {
  //         setlistParent([]);
  //       }
  //     })
  //     .catch(function (err) {
  //       setlistParent([]);
  //     });
  // }, []);
  const handleAddStudent = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          fullname: values?.Fullname,
          dob: moment(values?.Dob).format('YYYY-MM-DDTHH:mm:ss'),
          parentId: Number(parentId),
          email: "",
          password: "",
          isDeleted: false,
        };
        if (values) {
          const response = await axios.post("/api/Student/Insert", newData);
          if (response.data?.StatusCode > 0) {
            setStudent(response.data.Id)
            setIsAddStudentSuccessful(true);
          } else {
            toast.error("Thất bại!");
            setIsAddStudentSuccessful(false);
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          toast.error("Thất bại!");
          setIsAddStudentSuccessful(false);
        }
      });
  };
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      next();
    });
  };
  const handleSubmitAndNext = async () => {
    await handleAddStudent(); 
    if (isAddStudentSuccessful) {
      // Chỉ chuyển sang bước tiếp theo nếu thêm sinh viên thành công
      handleNextForm();
    }
    // handleNextForm();
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
            <Button type="primary" onClick={handleSubmitAndNext} >
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
