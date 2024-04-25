/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Radio, Tabs, Input, DatePicker, Select } from "antd";
import { useSelector, useStore } from "react-redux";
import _ from "lodash";
import "react-phone-number-input/style.css";
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
  const [activeKey, setActiveKey] = useState("1");
  const [value, setValue] = useState(1);
  const [isLoad, setIsLoad] = useState(0);
  const [listGender, setListGender] = useState([]);
  const [listCountry, setCountry] = useState([]);
  const realTimeMarket = useSelector((state) => state.gShared.realTimeMarket);

  useEffect(() => {
    
  }, []);
  // console.log(form, "formformform");
  const changeValue = _.debounce(async (key, value) => {
    setIsLoad(new Date().getTime());
  }, 0);

  const [showIcon, setShowIcon] = useState(false);
  const [showIcon1, setShowIcon1] = useState(false);
  const [showIcon2, setShowIcon2] = useState(false);

  const validateNewPassword = (_, value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const regexSpecial = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/;

    let isValid = true;

    if (value && value !== undefined) {
      if (value?.indexOf(" ") >= 0 || value?.trim() === "") {
        setShowIcon1(false);
        isValid = false;
      } else {
        setShowIcon1(true);
      }

      if (value?.length < 8 || value?.length > 32) {
        setShowIcon(false);
        isValid = false;
      } else {
        setShowIcon(true);
      }

      if (!regexSpecial.test(value) || !regex.test(value)) {
        setShowIcon2(false);
        isValid = false;
      } else {
        setShowIcon2(true);
      }
    }

    return isValid ? Promise.resolve() : Promise.reject();
  };
                                                                                                     
  const handleIdDateChange = (date) => {
    const idDate = moment(date);
    const idDateExp = idDate.clone().add(15, "years");
    form.setFieldsValue({ idDate_Exp: idDateExp });
  };

  return (
    <div className="pr-1">
      <h3 className="m-0 text-left">{t("caiDatMatKhau")}</h3>
      <div className="ant-form-createacc">
        <Form.Item
          label={t("matKhauMoi2")}
          name={"newPassword"}
          className="m-0"
          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap, { validator: validateNewPassword }]}
        >
          <Input.Password placeholder={t("nhapMatKhauMoi")} />
        </Form.Item>
        <Form.Item
          label={t("nhapLaiMatKhau")}
          name="password"
          className="m-0"
          rules={[
            globalConst.ANT.FORM.RULES.yeuCauNhap,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("matKhauXacNhanKhongTrungKhopVoi")));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="ant-form-desc pt-3">
            <h4 className="m-0">{t("matKhauDangNhapPhaiCo")}</h4>
            <ul>
              <li className={`${showIcon ? "acp" : ""}`}>
                {showIcon ? (
                  <div className="dot">
                    <img src="/static/img/icon/ic_acp.svg" alt="img" />
                  </div>
                ) : (
                  <div className="dot"></div>
                )}
                <div>{t("doDaiGom8-32KyTu")}</div>
              </li>
              <li className={`${showIcon2 ? "acp" : ""}`}>
                {showIcon2 ? (
                  <div className="dot">
                    <img src="/static/img/icon/ic_acp.svg" alt="img" />
                  </div>
                ) : (
                  <div className="dot"></div>
                )}
                <div>{t("baoGomChuHoaChuThuongSo")}</div>
              </li>
              <li className={`${showIcon1 ? "acp" : ""}`}>
                {showIcon1 ? (
                  <div className="dot">
                    <img src="/static/img/icon/ic_acp.svg" alt="img" />
                  </div>
                ) : (
                  <div className="dot"></div>
                )}
                <div>{t("khongBaoGomKhoangTrang")}</div>
              </li>
            </ul>
          </div>
        </Form.Item>
      </div>
    </div>
  );
});

export default StepSix;
