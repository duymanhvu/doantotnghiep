import React from "react";

import Notification from "rc-notification";


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

