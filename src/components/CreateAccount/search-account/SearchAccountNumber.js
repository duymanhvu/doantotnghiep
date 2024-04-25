/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Radio, Tabs, Input, Button, Slider, Select, Table } from "antd";
import { useDispatch, useStore } from "react-redux";
import _ from "lodash";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { InputOTP } from "antd-input-otp";
import { useTranslation } from "react-i18next";
import { useGlobalConst } from "../../apiCore/useGlobalConst";

const { Option } = Select;

const SearchAccountNumber = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const store = useStore();
  const [formSearch] = Form.useForm();
  const globalConst = useGlobalConst();
  const [activeKey, setActiveKey] = useState("1");
  const [value, setValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { listCustidArchive, form, hanleGetListCustArchive } = props;

  const { gShared } = store.getState();
  const { language } = gShared;

  const handleOnValueChange = (changedValues, allValue) => {};

  const [carSort, setCarSort] = useState([]);
  const [cartLocation, setCartLocation] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState("");
  const [selectedRow, setselectedRow] = useState({});

  useEffect(() => {
    

    console.log(listCustidArchive, "vform");
  }, [listCustidArchive]);

  const columns = [
    {
      title: t("stt"),
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: t("soTaiKhoan"),
      dataIndex: "custid",
      key: "custid",
    },
    {
      title: t("giaTri"),
      dataIndex: "amt",
      key: "amt",
    },
    {
      title: t("chon"),
      key: "action",
      render: (text, record) => <Button type="functions" style={{color: "#e7ab21"}} onClick={() => handleSelectRow(record)}>{t('chon')}</Button>,
    },
  ];

  const handleSelectRow = (record) => {
    setSelectedRowKey(record.key);
    setselectedRow(record);
    form.setFieldValue("rowSelected", record);
  };

  let locale = {
    emptyText: (
      <div className="ant-form-empty d-flex flex-column align-items-center justify-content-center" style={{ gap: "2px", padding: "10px" }}>
        <span>{t("chuaCoDuLieu")}</span>
      </div>
    ),
  };

  const searchConditions = (startIndex, endIndex) => {
    // handleGetListInforPayment();
  };

  console.log(form.getFieldsValue(), "aaaaaaaaaaaaaaaa");

  return (
    <div className="createacc__acc">
      <div className="createacc__acc-search">
        <Form.Item name={"rowSelected"} hidden></Form.Item>
        <Form.Item
          name="searchcustodycd"
          rules={[
            { required: true, message: "Please enter your text" },
            // Add more validation rules as needed
          ]}
        >
          <Input
            placeholder={t("timKiemSoMongMuon")}
            onKeyPress={(e) => {}}
            //    onChange={handleChange}
            // style={{ textTransform: "capitalize" }}
          />
        </Form.Item>

        <div>
          <Button onClick={() => {hanleGetListCustArchive(form.getFieldsValue())}} type="primary">
            {t("timKiem")}
          </Button>
        </div>
      </div>
      <Form.Item name={"rangeAmt"} label={t("khoangGia")}>
        <Slider range defaultValue={[0, 50]} min={0} max={20000} />
      </Form.Item>
      <div className="createacc__acc-filter">
        <Form.Item label={t("locTheo")} name={"sort"}>
          <Select {...globalConst.ITEM.INPUT.SELECT_COMPLEX_SEARCH} showSearch optionFilterProp="children" allowClear placeholder={t("sapXep")}>
            {carSort &&
              carSort.map((item, idx) => (
                <Option value={item?.cdval} key={idx}>{`${language && language === "vn" ? item?.vN_CDCONTENT : item?.cdcontent}`}</Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name={"location"}>
          <Select
            {...globalConst.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
            showSearch
            optionFilterProp="children"
            allowClear
            placeholder={t("viTriThuTuMongMuon")}
          >
            {cartLocation &&
              cartLocation.map((item, idx) => (
                <Option value={item?.cdval} key={idx}>{`${language && language === "vn" ? item?.vN_CDCONTENT : item?.cdcontent}`}</Option>
              ))}
          </Select>
        </Form.Item>

        <div className="d-flex justify-content-end">
          <Button onClick={() => {}} type="primary">
            {t("datLai")}
          </Button>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          className="ant-table-default"
          dataSource={listCustidArchive.map((e, i) => ({
            ...e,
          }))}
          rowClassName={(record) => (selectedRowKey === record.key ? "selected-row" : "")}
          locale={locale}
          pagination={false}
          scroll={{
            x: "100%",
          }}
        />
        <div className="ag-footer">
          {/* <Pagination
            currentPage={currentPage}
            onPageSizeChanged={(e) => {
              const startIndex = 1;
              const endIndex = e;
              setPageSize(e);
              searchConditions(startIndex, endIndex);
              setCurrentPage(1);
            }}
            totalCount={totalRecord}
            pageSize={pageSize}
            onPageChange={(page) => {
              const startIndex = (page - 1) * pageSize + 1;
              const endIndex = Math.min(page * pageSize, totalRecord);
              setCurrentPage(page);
              searchConditions(startIndex, endIndex);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
});

export default SearchAccountNumber;
