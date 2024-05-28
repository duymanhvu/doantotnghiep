/** @format */

import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link, unstable_HistoryRouter } from "react-router-dom";

export const ExportContentMoDau = (props) => {
  const { t } = useTranslation();
  const { setCurrentStep } = props;

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Thanh toán thành công</h1>
            
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <h1>
              <Link to="/home">Quay lại</Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExportContentSuccess = (props) => {
  const { t } = useTranslation();
  const { setCurrentStep } = props;
  let history = unstable_HistoryRouter();
  return (
    <div className="createacc__success">
      <img src="/static/img/icon/ic_createacc_success.svg" alt="img" />
      <h4>{t("congTyCoPhanChungKhoan")}</h4>

      <h3>{t("xinChucMung")}</h3>

      <div>{t("moTaiKhoanThanhCong")}</div>

      <Button
        type="primary"
        onClick={() => {
          history.push("/banggia/vn30");
        }}
      >
        <span>{t("batDauGiaoDich")}</span>
      </Button>
    </div>
  );
};
