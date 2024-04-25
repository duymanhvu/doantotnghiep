/** @format */

import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { unstable_HistoryRouter } from "react-router-dom";

export const ExportContentMoDau = (props) => {
  const { t } = useTranslation();
  const { setCurrentStep } = props;
  
  return (
    <>
      <h3 className="pb-4">{t("moTaiKhoanChungKhoanTrucTuyen")}</h3>

      <div className="createacc__desc">
        {t("chaoMungQuyKhachDangKyMoTaiKhoan")}
      </div>

      <div className="createacc__list">
        <div className="createacc__item">1. {t("cmndHoacCCCDConHieuLuc")}</div>
        <div className="createacc__item">2. {t("mayTinhHoacDienThoaiCoCamera")}</div>
        <div className="createacc__item">3. {t("dienThoaiDiDongDeNhanMatKhauOTP")}</div>

        <div className="createacc__item sub">{t("bamNutBatDauDeChuyenDenManHinh")}</div>

        <Button type="primary" onClick={() => setCurrentStep(2)}>
          <span>{t("batDau")}</span>
        </Button>
      </div>
    </>
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
