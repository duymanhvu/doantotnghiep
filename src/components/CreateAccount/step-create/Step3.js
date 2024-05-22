import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { toast } from "react-toastify";
import moment from "moment";
import { useAxios } from "../../apiCore/apiHelper";
import { convertToArray } from "../../apiCore/convertObject";
import { Link } from "react-router-dom";
const { Option } = Select;

const Step3 = ({ formData, next, setFormData, student, setStudent, prev, formCASign, listSchedule }) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
  const axios = useAxios();

  console.log(formCASign.getFieldValue("scheduleList"), "formCASignformCASignformCASign");
  let valueS = convertToArray(formCASign.getFieldValue("scheduleList")).map((item) => item?.subject);
  const listDanhSach = convertToArray(listSchedule).filter((e) => valueS.includes(e?.Id));
  const datas = listDanhSach.map((item) => ({
    classroomId: item?.Id,
    subjectId: item?.Subject?.Id,
    buyingPrice: item?.Subject?.CurrentPrice,
  }));
  const monHoc = listDanhSach.map((obj) => obj.Subject.Name);
  const totalBuyingPrice = datas.reduce((sum, item) => sum + item.buyingPrice, 0);
  const handleThanhToan = () => {
    const params = {
      studentId: student,
      name: "Thanh toán",
      carts: datas,
    };
    axios
      .post("/api/Classroom/CheckOut", params)
      .then((res) => {
        if (res.status === 200) {
          const link = res.data;
          console.log(res, "lllllllllllllllllllllllll");
          window.open(link, "_blank");
        } else {
        }
      })
      .catch(function (err) {});
  };
  const handleNextForm = () => {
    formCASign.validateFields().then((values) => {
      const data = { ...formData, ...values };
      setFormData(data);
    });
  };

  return (
    <>
      <h3 className="">Thanh toán</h3>

      <div className="ant-form-createacc">
        <div className="req">Môn học bạn đã chọn: {monHoc}</div>
        <div className="req">Số tiền bạn cần thanh toán: {totalBuyingPrice} đồng</div>
        <Form.Item>
          <Button type="primary" onClick={handleThanhToan}>
            <Link to="/home">Thanh Toán</Link>
          </Button>
          <Button type="primary" onClick={prev}>
            Quay lại
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default Step3;
