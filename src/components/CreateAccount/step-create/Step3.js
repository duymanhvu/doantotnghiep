import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { toast } from "react-toastify";
import moment from "moment";
import { useAxios } from "../../apiCore/apiHelper";
import { convertToArray } from "../../apiCore/convertObject";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const Step3 = ({
  formData,
  next,
  setFormData,
  student,
  setStudent,
  prev,
  formCASign,
  listSchedule,
}) => {
  const { t } = useTranslation();
  const AxiosAPI = useShareOrderApi();
  const axios = useAxios();
  const navigate = useNavigate();
  console.log(
    formData.studentId,
    "formCASignformCASignformCASign"
  );
  let valueS = convertToArray(formCASign.getFieldValue("scheduleList")).map(
    (item) => item?.subject
  );
  const listDanhSach = convertToArray(listSchedule).filter((e) =>
    valueS.includes(e?.Id)
  );
  const datas = listDanhSach.map((item) => ({
    classroomId: item?.Id,
    subjectId: item?.Subject?.Id,
    buyingPrice: item?.Subject?.CurrentPrice,
  }));
  const monHoc = listDanhSach.map((obj) => obj.Subject.Name);
  const totalBuyingPrice = datas.reduce(
    (sum, item) => sum + item.buyingPrice,
    0
  );
  const handleThanhToan = () => {
    const params = {
      studentId: formData.studentId,
      name: "Thanh toán",
      carts: datas,
    };
    axios
      .post("/api/Classroom/CheckOut", params)
      .then((res) => {
        if (res.data.StatusCode > 0) {
          const link = res.data.Data;
          // window.open(link, "_blank");
          window.location.assign(link)
        } else {
          toast.error("Thiếu thông tin nào đó vui lòng kiểm tra lại");
        }
      })
      .catch(function (err) {
        toast.error("Error!");
      });
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
        <div className="req">
          Số tiền bạn cần thanh toán: {totalBuyingPrice} đồng
        </div>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" danger onClick={prev}>
            Quay lại
          </Button>
          <Button
            type="primary"
            onClick={handleThanhToan}
            style={{ marginLeft: 20, marginTop: 50 }}
          >
            Thanh toán
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default Step3;
