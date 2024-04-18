import { Button, Col, Input, Popconfirm, Row, Table, Tooltip } from "antd";
import { Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { useAxios } from "../../apiCore/apiHelper";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { convertToArray, notificationShare } from "../../apiCore/convertObject";

const Parent = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState([]);
  const AxiosAPI = useShareOrderApi();
  // const [formCASign] = Form.useForm();
  const formCASign = {};
  const axios = useAxios();
  const [selectedRow, setSelectedRow] = useState(false);
  const [checkFinish, setCheckFinish] = useState(false);

  const columns = [
    {
      title: t("Họ và tên"),
      dataIndex: "Fullname",
      key: "Fullname",
      align: "center",
    },
    {
      title: t("Ngày sinh"),
      dataIndex: "Dob",
      key: "Dob",
      align: "center",
    },
    {
      title: t("Số điện thoại"),
      dataIndex: "Phone",
      key: "Phone",
      align: "center",
    },
    {
      title: t("Email"),
      dataIndex: "Email",
      key: "Email",
      align: "center",
    },
    {
      title: t("Mật khẩu"),
      dataIndex: "Password",
      key: "Password",
      align: "center",
    },
    {
      title: t("chucNang"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="d-flex justify-content-center align-items-center">
          <Tooltip placement="top" title={t("sua")}>
            <Button type="actions" onClick={() => handleEditClick(record)}>
              <img src="/ic_edit.svg" alt="img" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={"Xóa"}>
            <Button type="actions" disabled={selectedRow}>
              <Popconfirm
                cancelText={t("dong")}
                cancelButtonProps={{ type: "secondary" }}
                okText={t("xacNhan")}
                title={t("chacChanXoa")}
                onConfirm={() => handleDelete(record.autoId)}
              >
                <img src="/ic_delete.svg" alt="img" />
              </Popconfirm>
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  // useEffect(() => {
  //   AxiosAPI.getParentGetList()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setListData(convertToArray(res?.data?.Data));
  //       } else {
  //         setListData([]);
  //       }
  //     })
  //     .catch(function (err) {
  //       setListData([]);
  //     });
  // }, []);
  useEffect(() => {
    handleGetLisDigitalSignature();
  }, []);
  const handleGetLisDigitalSignature = () => {
    AxiosAPI.getParentGetList()
      .then((res) => {
        if (res.status === 200) {
          setListData(convertToArray(res?.data?.Data));
        } else {
          setListData([]);
        }
      })
      .catch(function (err) {
        setListData([]);
      });
  };
  const handleEditClick = (record) => {
    setSelectedRow(true);

    formCASign.setFieldsValue({
      Id: record?.Id,
      Fullname: record?.Fullname,
      Dob: record?.Dob,
      Phone: record?.Phone,
      Email: record?.Email,
      Password: record?.Password,
    });
  };

  const handleAddDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          fullname: values?.Fullname,
          dob: values?.Dob,
          phone: values?.Phone,
          email: values?.Email,
          password: values?.Password,
        };
        console.log(newData, "newDatanewDatanewData", values);
        if (values) {
          const response = await axios.post("/api/Parent/Insert", newData);
          console.log(response, "response");

          if (response.data?.errorCode >= 0) {
            notificationShare(0, response.data?.ErrorMessage, t("thanhCong"));
            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            notificationShare(-1, response.data?.ErrorMessage, t("thatBai"));
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          notificationShare(-1, err.response?.data?.ErrorMessage, t("thatBai"));
        }
      });
  };
  const handleEditDigitalSignature = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const newData = {
          ...values,
        };
        if (values) {
          const response = await axios.post("/api/Parent/Update", newData);

          if (response.data?.errorCode >= 0) {
            notificationShare(0, response.data?.ErrorMessage, t("thanhCong"));

            handleGetLisDigitalSignature();
            formCASign.resetFields();
            setSelectedRow(false);
            setCheckFinish(!checkFinish);
          } else {
            notificationShare(-1, response.data?.ErrorMessage, t("thatBai"));
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          notificationShare(-1, err.response?.data?.ErrorMessage, t("thatBai"));
        }
      });
  };
  const handleDelete = (autoId) => {
    axios
      .post(`/api/Parent/Delete?id=${autoId}?Token=abcd123`)
      .then((response) => {
        if (response.status === 200 && response.data.errorCode >= 0) {
          notificationShare(0, response.data.errorMsg, t("thanhCong"));
        } else {
          notificationShare(-1, response.data.errorMsg, t("thatBai"));
        }
      })
      .catch((err) => {
        console.error(err);

        if (err.response && err.response.data) {
          notificationShare(-1, err.response.data, t("thatBai"));
        }
      })
      .finally(() => {
        handleGetLisDigitalSignature();
        formCASign.resetFields();
      });
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Parent</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="registration__form">
          <div className="registration__form-wrap">
            <div className="heading v1 text-center">Parent</div>
            <div className="row">
              <div className="col-lg-12">
                <div className="heading v2">Thông Tin</div>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-4">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    // {...register("spouse_title", {})}
                  >
                    <option value=""></option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-4">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    type="text"
                    // {...register("spouse_first_name", {})}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-4">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    // {...register("spouse_last_name", {})}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    // {...register("spouse_last_name", {})}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-4">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="text"
                    // {...register("spouse_last_name", {})}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Label>Thao tác</Form.Label>

                <Form.Group className="mb-4">
                  <button className="btn btn-home" type="submit">
                    Gửi
                  </button>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="heading v2">Danh sách</div>
                <Table
                  className="ant-table-default"
                  columns={columns}
                  dataSource={listData?.map((e, i) => ({
                    ...e,
                    key: e?.autoId,
                  }))}
                  pagination={false}
                  scroll={{
                    x: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent;
