/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Select, Space, Tag, Button, Tooltip, Input, Modal, Upload, Slider } from "antd";
import { useStore } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { UploadOutlined, EditOutlined, RotateLeftOutlined, RotateRightOutlined } from "@ant-design/icons";
import AvatarEditor from "react-avatar-editor";
import ImageUpload from "./ImageUpload";
import { useGlobalConst } from "../../apiCore/useGlobalConst";

const Step5 = forwardRef((props, ref) => {
  const store = useStore();
  const { t } = useTranslation();
  const globalConst = useGlobalConst();
  const [editedImage, setEditedImage] = useState(null);
  return (
    <>
      <h3 className="m-0 text-left">{t("chupTaiChuKy")}</h3>
      <div className="createacc__photo">
        <div className="createacc__photo-wrap">
          <div className="box">
            <div className="head">{t("chupTaiChuKy")}</div>
            <ImageUpload editedImage={editedImage} setEditedImage={setEditedImage} />
          </div>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
});

export default Step5;
