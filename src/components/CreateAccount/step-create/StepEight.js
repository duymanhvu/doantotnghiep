/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Radio, Tabs, Input, DatePicker, Select, Checkbox } from "antd";
import { useSelector, useStore } from "react-redux";
import _ from "lodash";
import "react-phone-number-input/style.css";
import { useTranslation } from "react-i18next";
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

  return (
    <div className="createacc__rules">
      <h3 className="m-0 text-left pb-3">{t("hopDongMoTaiKhoan")}</h3>
      <div className="createacc__rule-contract">
        <iframe src="/static/img/download.pdf" className="w-100 h-100" />
      </div>
      <h3 className="m-0 text-left pb-3">{t("dieuKhoanMoTaiKhoan")}</h3>
      <div className="ant-form-createacc">
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement"))),
            },
          ]}
        >
          <Checkbox>{t("toiDongYVoiMoiDieuKhoanTren")}</Checkbox>
        </Form.Item>
      </div>
    </div>
  );
});

export default StepSix;
