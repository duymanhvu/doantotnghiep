/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Form, Select, Space, Tag, Button, Tooltip, Input, Modal, Upload, Slider } from "antd";
import { useStore } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { UploadOutlined, EditOutlined, RotateLeftOutlined, RotateRightOutlined } from "@ant-design/icons";
import AvatarEditor from "react-avatar-editor";
import ImageUpload from "./ImageUpload";
import { useGlobalConst } from "../../apiCore/useGlobalConst";

const Step3 = forwardRef((props, ref) => {
  const store = useStore();
  const { t } = useTranslation();
  const globalConst = useGlobalConst();
  const [editedImage, setEditedImage] = useState(null);
  const [editedImage2, setEditedImage2] = useState(null);

  console.log(editedImage, "editedImage");
  return (
    <>
      <h3 className="m-0 text-left">{t("chupAnhCMNDCCCD")}</h3>
      <div className="createacc__photo">
        <ul>
          <li>{t("damBaoThietBiDaDuocCapQuyen")}</li>
          <li>{t("giayToTuyThanChinhChu")}</li>
        </ul>

          <div className="createacc__photo-wrap">
            <div className="box">
              <div className="head">{t("cmndCCCDMatTruoc")}</div>
              <ImageUpload editedImage={editedImage} setEditedImage={setEditedImage} />
              {!editedImage || (editedImage === null && <div className="ant-form-item-explain-error">{t("khongDuocDeTrong3")}</div>)}
            </div>
            <div className="box">
              <div className="head">{t("cmndCCCDMatSau")}</div>
              <ImageUpload editedImage={editedImage2} setEditedImage={setEditedImage2} />
            </div>
          </div>

          <div className="createacc__photo-tutorial">
            <div className="box">
              <img src="/static/img/icon/ic_tutorial_camera_1.png" />
              <div className="desc">{t("khongChupQuaMo")}</div>
            </div>
            <div className="box">
              <img src="/static/img/icon/ic_tutorial_camera_2.png" />
              <div className="desc">{t("khongChupMatGoc")}</div>
            </div>
            <div className="box">
              <img src="/static/img/icon/ic_tutorial_camera_3.png" />
              <div className="desc">{t("khongChupToiHoacLoaSang")}</div>
            </div>
          </div>
      </div>
    </>
  );
});

export default Step3;
