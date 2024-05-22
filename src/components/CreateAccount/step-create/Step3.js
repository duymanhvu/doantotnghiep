import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { toast } from "react-toastify";
import moment from "moment";
import { useAxios } from "../../apiCore/apiHelper";
const { Option } = Select;

const Step3 = ({ formData, next, setFormData,student,setStudent,prev}) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const [isAddStudentSuccessful, setIsAddStudentSuccessful] = useState(false); 

  console.log(formData,"kkkkkkkkkkkkkkkkkkkkkkkk");
  const [listParent, setlistParent] = useState([]);
  const handleThanhToan = () => {
      const params = {
        studentId: formData.studentId,
        name:"",
        carts: [
          {
            classroomId: formData.Id,
            subjectId: formData.Subject.Id,
            buyingPrice: formData.Subject.CurrentPrice
          }
        ]

      };
      console.log(params,"paramsparamsparamsparams");
      axios
        .post("/api/Classroom/CheckOut", params)
        .then((res) => {
          if (res.status === 200) {
            
          } else {
            
          }
        })
        .catch(function (err) {
          
        });
    };
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
      
    });
  };
  const handleSubmitAndNext = async () => {
    await handleThanhToan(); 
    // if (isAddStudentSuccessful) {
    //   // Chỉ chuyển sang bước tiếp theo nếu thêm sinh viên thành công
    //   handleNextForm();
    // }
    handleNextForm();
  };
  return (
    <>
      <h3 className="">Thanh toán</h3>
      <Form id="form" className="form" form={formCASign}>
        <div className="ant-form-createacc">
          <div className="req">Môn học bạn đã chọn: {formData.Subject.Name}</div>
          <div className="req">Số tiền bạn cần thanh toán: {formData.Subject.CurrentPrice} đồng</div>
          <Form.Item>
            <Button type="primary" onClick={handleThanhToan} >
              Thanh Toán
            </Button>
            <Button type="primary" onClick={prev}>
              Quay lại
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Step3;
