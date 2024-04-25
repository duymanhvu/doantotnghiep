/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Radio, Tabs, Input, DatePicker, Select } from "antd";
import { useSelector, useStore } from "react-redux";
import _ from "lodash";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { convertToArray } from "../../apiCore/convertObject";
import { useGlobalConst } from "../../apiCore/useGlobalConst";

const StepSix = forwardRef((props, ref) => {
  const { form, createAccount } = props;
  const { t } = useTranslation();
  const store = useStore();
  const { gShared } = store.getState();
  const globalConst = useGlobalConst();
  const { Option } = Select;
  const [listGender, setListGender] = useState([]);
  const [listCountry, setCountry] = useState([]);

  useEffect(() => {
   
    
  }, []);
  
  const handleIdDateChange = (date) => {
    const idDate = moment(date);
    const idDateExp = idDate.clone().add(15, "years");
    form.setFieldsValue({ idDate_Exp: idDateExp });
  };

  return (
    <div className="pr-1">
      <h3 className="m-0 text-left">{t("xacNhanThongTin")}</h3>
      <div className="ant-form-createacc">
        <Form.Item label={t("hoVaTen")} name="fullName" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("hoVaTen2"))]}>
          <Input />
        </Form.Item>
        <Form.Item label={t("soDienThoai2")} name="phone" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("soDienThoai"))]}>
          <Input />
        </Form.Item>
        <Form.Item
          {...globalConst.ANT.FORM.ITEM.PARSER.DATE_FROM_DATE}
          label={t("ngaySinh")}
          name="dob"
          rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("ngaySinh2"))]}
        >
          <DatePicker
            {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
            autoComplete="off"
            allowClear={false}
            placeholder={t("ddMMYYYY")}
            format={globalConst.ANT.LOCALE.dateFormat}
            inputReadOnly={true}
            disabledDate={(current) => {
              let customDate = moment().format(globalConst.ANT.LOCALE.dateFormat);
              return current && current >= moment(customDate, globalConst.ANT.LOCALE.dateFormat);
            }}
          />
        </Form.Item>
        <Form.Item label={t("email2")} name="email" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("email"))]}>
          <Input />
        </Form.Item>

        <Form.Item label={t("gioiTinh")} name="sex" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("gioiTinh2"))]}>
          <Radio.Group>
            {listGender.map((item, index) => (
              <Radio value={item?.cdval} key={index} title={gShared?.language === "en" ? item?.cdcontent : item?.vN_CDCONTENT}>
                {gShared?.language === "en" ? item?.cdcontent : item?.vN_CDCONTENT}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t("diaChiLienHe")} name="contactAddress" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("diaChiLienHe2"))]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t("soCMNDCCCD")}
          name="idCode"
          rules={[
            globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("soCMNDCCCD2")),
            globalConst.ANT.FORM.RULES.doDaiToiThieu(t("soCMNDCCCD2"), 9),
          ]}
        >
          <Input
            onKeyPress={(event) => {
              if (/[^A-Za-z 0-9]/g.test(event.key)) {
                event.preventDefault();
              }
            }}
            maxLength={12}
          />
        </Form.Item>
        <Form.Item
          {...globalConst.ANT.FORM.ITEM.PARSER.DATE_FROM_DATE}
          label={t("ngayCap2")}
          name="idDate"
          rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("ngayCap"))]}
        >
          <DatePicker
            {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
            autoComplete="off"
            allowClear={false}
            placeholder={t("ddMMYYYY")}
            format={globalConst.ANT.LOCALE.dateFormat}
            inputReadOnly={true}
            disabledDate={(current) => {
              let customDate = moment().format(globalConst.ANT.LOCALE.dateFormat);
              return current && current >= moment(customDate, globalConst.ANT.LOCALE.dateFormat);
            }}
            onChange={handleIdDateChange}
          />
        </Form.Item>

        <Form.Item {...globalConst.ANT.FORM.ITEM.PARSER.DATE_FROM_DATE} label={t("ngayHetHan")} name="idDate_Exp">
          <DatePicker
            {...globalConst.ANT.FORM.ITEM.INPUT.SELECT_COMPLEX_SEARCH}
            autoComplete="off"
            allowClear={false}
            placeholder={t("ddMMYYYY")}
            format={globalConst.ANT.LOCALE.dateFormat}
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item label={t("noiCap2")} name="idPlace" rules={[globalConst.ANT.FORM.RULES.khongDeTrongVaKhacKhong(t("noiCap"))]}>
          <Input />
        </Form.Item>
        <Form.Item label={t("diaChiThuongTru")} name="address" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item label={t("quocTich")} name="country" rules={[]}>
          <Select {...globalConst.ITEM.INPUT.SELECT_COMPLEX_SEARCH} showSearch optionFilterProp="children" allowClear={false}>
            {convertToArray(listCountry).map((item, index) => (
              <Option value={item?.country} key={index} title={item?.country_name}>
                {item?.country_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
});

export default StepSix;
