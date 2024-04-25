import React from "react";

import Notification from "rc-notification";
import {  Modal } from "antd";
import { useTranslation } from "react-i18next";

const PopupSuccess = (props) => {
  const { t } = useTranslation();
  const { handleCancel, isModalOpen} = props;
  // const { data, isOpen } = isModalOpen;


  return (
   <Modal  footer={null} centered className="ant-modal-success" onCancel={() => handleCancel()}>
      <div className="group">
        <div className="head">
          <img src="/static/img/icon/ic_modal_success.svg" alt="img" />
          {t("Success")}
        </div>
        <div className="body">
          <div>
            <div className="content">
                {/* {t("huyThanhCong")} {data?.data?.filter(e => e.code === 200 || e.code === 0).length}/{data?.data?.length} {t("lenh2")} */}
            </div>  
          </div>
        </div>
      </div> 
    </Modal>
  );
};

export default PopupSuccess;


let notification = null;
Notification.newInstance(
  {
    closable: true,
    duration: 5,
    style: {
      top: 30,
      right: 340,
      color: "#000",
    },
  },
  (n) => (notification = n)
);
export const updateLoadingStatus = (dispatch, data) => {
  dispatch({ type: "SET_STATUS_LOADING", payload: data });
};
export const notificationShare = (price, contents, title) => {
  const customContent = (
    <div className={`rc-notification-notice-custom ${price === 0 || price === 200 ? "rc-notification-notice-success" : "rc-notification-notice-error"}`}>
      <div className="rc-notification-notice-icon"></div>
      <div className="rc-notification-notice-content">
        <h5>{price === 0 ? title : title}</h5>
        <p>{contents}</p>
      </div>
    </div>
  );

  return notification.notice({
    content: customContent,
    duration: 5,
  });
};
export const convertToArray = (arr) => {
    return Array.isArray(arr) ? arr : [];
  };

