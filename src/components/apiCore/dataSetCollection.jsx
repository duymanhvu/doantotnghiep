/** @format */

import { Badge, Dropdown, Input, Menu, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useStore } from "react-redux";

import Moment from "react-moment";
const Cell = ({ children }) => {
  return <div className="cell-content">{children}</div>;
};
const handleChangePirce = (value, key) => {
  if (value === 0 || value === "0") {
    return key[0];
  } else if (!isNaN(value)) {
    if (Number(value) > 0) {
      return key[1];
    } else return key[2];
  } else return key[3];
};
export const formatGia = (totalPrice) => {
    if (totalPrice) return (totalPrice + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return "0";
  };
  export const ftv = (val) => {
    if ((val === null || val === "" || val === undefined) && val !== 0 && val !== "0") {
      return undefined;
    } else if (val === 0 || val === "0") {
      return true;
    }
    return val;
  };
export const StatusOrderInDay = ({ value, data }) => {
  let keyValue = data?.orstatusvl + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "1":
        return "";
      case "2":
        return "#CCAC3D";
      case "3":
        return "#F04A47";
      case "4":
        return "#4FD08A";
      case "8":
        return "#E7AB21";
      case "13":
        return "#4FD08A";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.orstatus_en : data?.orstatus}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.orstatus_en : data?.orstatus}</span>
    </Tooltip>
  );
};
export const StatusOrderHistory = ({ value, data }) => {
  let keyValue = value + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "3":
        return "#F04A47";
      case "4":
        return "#4FD08A";
      case "5":
        return "";
      case "6":
        return "";
      case "7":
        return "#4FD08A";
      case "10":
        return "#CCAC3D";
      case "12":
        return "";
      case "13":
        return "#4FD08A";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.orstatus_texten : data?.orstatus_text}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.orstatus_texten : data?.orstatus_text}</span>
    </Tooltip>
  );
};
export const StatusListTranfer = ({ value, data }) => {
  let keyValue = value + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "1":
        return "#4FD08A";
      case "4":
        return "#E7AB21";
      case "5":
        return "#F04A47";
      case "8":
        return "#F04A47";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.status_en : data?.status_vn}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_en : data?.status_vn}</span>
    </Tooltip>
  );
};
export const Txstatus = ({ value, data }) => {
  let keyValue = value + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "1":
        return "#4FD08A";
      case "4":
        return "#E7AB21";
      case "5":
        return "#F04A47";
      case "8":
        return "#F04A47";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.txstatus_en : data?.txstatus_vn}>
      <span>{gShared?.language === "en" ? data?.txstatus_en : data?.txstatus_vn}</span>
    </Tooltip>
  );
};
export const StatusDepositList = ({ value, data }) => {
  let keyValue = data?.status + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "A":
        return "#4FD08A";
      case "P":
        return "#EE7420";
      case "C":
        return "#FFF";
      case "R":
        return "#F04A47";
      case "U":
        return "#F04A47";
      case "X":
        return "#F04A47";
      default:
        return "";
    }
  };
  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.status_Name_En : data?.status_Name}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_Name_En : data?.status_Name}</span>
    </Tooltip>
  );
};

export const ViaChannel = ({ value, data }) => {
  let keyValue = data?.via + "";
  const changeTXT = (keyValue) => {
    switch (keyValue) {
      case "F":
        return "Tại sàn";
      case "A":
        return "Đại lý";
      case "O":
        return "Web";
      case "T":
        return "Điện thoại";
      case "M":
        return "Mobile";
      case "P":
        return "Trên bảng giá";
      case "B":
        return "Broker";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={changeTXT(keyValue)}>
      <span>{changeTXT(keyValue)}</span>
    </Tooltip>
  );
};

export const StatusRight = ({ value, data }) => {
  let keyValue = data?.status + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      // case "F":
      //   return "#E7AB21";
      // case "F":
      case "D":
      case "G":
        return "#CCAC3D";
      // case "D":
      //   return "#";
      // case "G":
      //   return "#F04A47";
      case "C":
        return "#0BDF39";
      default:
        return "";
    }
  };
  return (
    <>
      <Tooltip placement="top" title={gShared?.language === "en" ? data?.status_texten : data?.status_text}>
        <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_texten : data?.status_text}</span>
      </Tooltip>
    </>
  );
};

export const StatusOrderDK = ({ value, data }) => {
  let keyValue = data?.status + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "0":
        return "#E7AB21";
      case "1":
        return "#0BDF39";
      case "2":
        return "#CCAC3D";
      case "3":
        return "#F04A47";
      case "4":
        return "#4FD08A";
      case "8":
        return "#E7AB21";
      case "9":
        return "#ff0210";
      case "13":
        return "#4FD08A";
      default:
        return "";
    }
  };

  return (
    <>
      <Tooltip placement="top" title={gShared?.language === "en" ? data?.orstatus_en : data?.orstatus}>
        <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_en : data?.status_text}</span>
      </Tooltip>
      {(data.status === "9" || data.status === "5") && data.errdesc !== "" && data.en_errdesc !== "" && (
        <Tooltip placement="top" title={gShared?.language === "vn" ? data.errdesc : data.en_errdesc}>
          <img src="/static/img/icon/ic_info.svg" alt="img" />
        </Tooltip>
      )}
    </>
  );
};
export const StatusSignCA = ({ value, data }) => {
  let keyValue = data?.status + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "N":
        return "#FFF";
      case "H":
        return "#4FD08A";
      case "A":
        return "#E7AB21";
      case "E":
        return "#F04A47";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.status_En : data?.status_Vn}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_En : data?.status_Vn}</span>
    </Tooltip>
  );
};
// export const StatusGetMoney = ({ value, data }) => {
//   let keyValue = data?.status + "";
//   const store = useStore();
//   const { gShared } = store.getState();
//   const changeColor = (keyValue) => {
//     switch (keyValue) {
//       case "N":
//         return "#FFF";
//       case "H":
//         return "#4FD08A";
//       case "A":
//         return "#E7AB21";
//       case "E":
//         return "#F04A47";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Tooltip placement="top" title={gShared?.language === "en" ? data?.status_En : data?.status_Vn}>
//       <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.status_En : data?.status_Vn}</span>
//     </Tooltip>
//   );
// };
export const PriceOrder = ({ value, data }) => {
  return (
    <Tooltip placement="top" title={!isNaN(value) ? Number(value) / 1000 : value}>
      <span>{!isNaN(value) ? Number(value) / 1000 : value}</span>
    </Tooltip>
  );
};
export const PeriodOrderDK = ({ value, data }) => {
  let keyValue = data?.period + "";
  const store = useStore();
  const { gShared } = store.getState();

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.orstatus_en : data?.orstatus}>
      <span>{gShared?.language === "en" ? data?.perIod_Name_En : data?.perIod_Name}</span>
    </Tooltip>
  );
};
export const StatusTransactionHistoryMoneyTranfer = ({ value, data }) => {
  let keyValue = data?.txstatus + "";
  const store = useStore();
  const { gShared } = store.getState();
  const changeColor = (keyValue) => {
    switch (keyValue) {
      case "8":
        return "#FFF";
      case "1":
        return "#4FD08A";
      case "4":
        return "#E7AB21";
      default:
        return "";
    }
  };

  return (
    <Tooltip placement="top" title={gShared?.language === "en" ? data?.txstatus_en : data?.txstatus_vn}>
      <span style={{ color: changeColor(keyValue) }}>{gShared?.language === "en" ? data?.txstatus_en : data?.txstatus_vn}</span>
    </Tooltip>
  );
};

export const MapColumnsANT = (columnList) => {
  const { t } = useTranslation();
  return columnList.map((e) => {
    let render =
      e?.render ||
      ((value, data) => {
        return (
          <Cell>
            <Tooltip placement="top" title={e.tooltipHTML ? <div dangerouslySetInnerHTML={{ __html: value }} /> : value}>
              <span>{ftv(value) ? value : "--"}</span>
            </Tooltip>
          </Cell>
        );
      });
    if (e.key?.toUpperCase() === "exectype".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "orstatusvl".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <StatusOrderInDay value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "orstatus".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <StatusOrderHistory value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "statusvl".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <StatusListTranfer value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "txstatus".toUpperCase() && e.dataType === "TXSTATUS_TRANSACTION") {
      render = (value, data) => {
        return (
          <Cell>
            <StatusTransactionHistoryMoneyTranfer value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "txstatus".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <Txstatus value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.dataType === "STATUS_ORDER_CON") {
      render = (value, data) => {
        return (
          <Cell>
            <StatusOrderDK value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.dataType === "STATUS_SIGN_CA") {
      render = (value, data) => {
        return (
          <Cell>
            <StatusSignCA value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "status".toUpperCase() && e.dataType !== "RIGHT_STATUS" && e.dataType !== "STATUS_ORDER_CON") {
      render = (value, data) => {
        return (
          <Cell>
            <StatusDepositList value={value} data={data} />
          </Cell>
        );
      };
    } else if (["quoteprice", "sendprice", "matchprice"].map((v) => v.toUpperCase()).includes(e.key?.toUpperCase())) {
      render = (value, data) => {
        return (
          <Cell>
            <PriceOrder value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "DATE10".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <Tooltip placement="top" title={value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY">{value}</Moment> : ""}>
              <span> {value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY">{value}</Moment> : ""}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "DAT16".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <Tooltip placement="top" title={value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY HH:mm">{value}</Moment> : ""}>
              <span> {value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY HH:mm">{value}</Moment> : ""}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "DATE19".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <Tooltip placement="top" title={value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY HH:mm:ss">{value}</Moment> : ""}>
              <span> {value && !value.includes("0001-01-01") ? <Moment format="DD/MM/YYYY HH:mm:ss">{value}</Moment> : ""}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "FOMAT_PRICE".toUpperCase()) {
      render = (value, data) => {
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={formatGia(value)}>
                <span>{formatGia(value)}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "FOMAT_QUANTITY".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <Tooltip placement="top" title={!value || value === "0" ? "0" : formatGia(value)}>
              <span>{!value || value === "0" ? "0" : formatGia(value)}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "FOMAT_PRICE_NB".toUpperCase()) {
      render = (value, data) => {
        if (data?.exectype?.toUpperCase() === "NB"?.toUpperCase() && ["4", "13"].includes(data?.orstatus)) {
          return (
            <Cell>
              <Tooltip placement="top" title={formatGia(value)}>
                <span>{formatGia(value)}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "0";
        }
      };
    } else if (e.dataType?.toUpperCase() === "FOMAT_PRICE_NS".toUpperCase()) {
      render = (value, data) => {
        if (data?.exectype?.toUpperCase() === "NS"?.toUpperCase() && ["4", "13"].includes(data?.orstatus)) {
          return (
            <Cell>
              <Tooltip placement="top" title={formatGia(value)}>
                <span>{formatGia(value)}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "0";
        }
      };
    } else if (e.key?.toUpperCase() === "via".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <ViaChannel value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "PRICE_HISTORY".toUpperCase()) {
      render = (value, data) => {
        if (["4", "13"].includes(data?.orstatus)) {
          return (
            <Cell>
              <Tooltip placement="top" title={data?.exectype === "NS" ? formatGia(Number(value) + Number(data?.transferfee)) : formatGia(value)}>
                <span>{data?.exectype === "NS" ? formatGia(Number(value) + Number(data?.transferfee)) : formatGia(value)}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "0";
        }
      };
    }  else if (e.dataType?.toUpperCase() === "PS_UP".toUpperCase()) {
      render = (value, data) => {
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`+${formatGia(value)}`}>
                {/* <span style={{ color: "#4FD08A" }}>{`+${formatGia(
                  value
                )}`}</span> */}
                <span>{`+${formatGia(value)}`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "PS_DOWN".toUpperCase()) {
      render = (value, data) => {
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`-${formatGia(value)}`}>
                {/* <span style={{ color: "#F04A47" }}>{`-${formatGia(
                  value
                )}`}</span> */}

                <span>{`-${formatGia(value)}`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "UP_AND_DOWN".toUpperCase()) {
      render = (value, data) => {
        const colorStyle = Number(data?.color);
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${handleChangePirce(colorStyle, [" ", "+", "", ""])}${formatGia(value)}`}>
                <span
                  style={{
                    color: handleChangePirce(colorStyle, ["#fff", "#4FD08A", "#F04A47", ""]),
                  }}
                >{`${handleChangePirce(colorStyle, [" ", "+", "", ""])}${formatGia(value)}`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "UP_AND_DOWN_TYLE".toUpperCase()) {
      render = (value, data) => {
        const colorStyle = Number(data?.color);
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${handleChangePirce(colorStyle, [" ", "+", "", ""])}${formatGia(value)} %`}>
                <span
                  style={{
                    color: handleChangePirce(colorStyle, ["#fff", "#4FD08A", "#F04A47", ""]),
                  }}
                >{`${handleChangePirce(colorStyle, [" ", "+", "", ""])}${formatGia(value)} %`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "COLOR_UP_DOWN".toUpperCase()) {
      render = (value, data) => {
        const colorStyle = Number(value);
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${colorStyle > 0 ? "+" : ""}${formatGia(value)}`}>
                <span style={{ color: colorStyle > 0 ? "#4FD08A" : "#F04A47" }}>{`${colorStyle > 0 ? "+" : ""}${formatGia(value)}`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.dataType?.toUpperCase() === "COLOR_UP_DOWN_TYLE".toUpperCase()) {
      render = (value, data) => {
        const colorStyle = Number(value);
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${colorStyle > 0 ? "+" : ""}${formatGia(value)} %`}>
                <span style={{ color: colorStyle > 0 ? "#4FD08A" : "#F04A47" }}>{`${colorStyle > 0 ? "+" : ""}${formatGia(value)} %`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (Array.isArray(e?.dataEvent) && e?.dataEvent[0] === "PLUS") {
      render = (value, data) => {
        let price = Number(data[e?.dataEvent["1"]]) + Number(data[e?.dataEvent["2"]]);
        return (
          <Cell>
            <Tooltip placement="top" title={ftv(price) ? formatGia(price) : "--"}>
              <span>{ftv(price) ? formatGia(price) : "--"}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (Array.isArray(e?.dataEvent) && e?.dataEvent[0] === "PUSH") {
      render = (value, data) => {
        let price = `${data[e?.dataEvent["1"]]} - ${data[e?.dataEvent["2"]]}`;
        return (
          <Cell>
            <Tooltip placement="top" title={price}>
              <span>{price}</span>
            </Tooltip>
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "PROFIT_LOSS".toUpperCase()) {
      render = (value, data) => {
        const colorStyle = data?.color;
        if (value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${value}`}>
                <span
                  style={{
                    color: handleChangePirce(colorStyle, ["#fff", "#4FD08A", "#F04A47", ""]),
                  }}
                >{`${colorStyle > 0 ? "" : ""}${value}`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    } else if (e.editable === true) {
      render = (value, data) => {
        if (Number(value) && value) {
          return (
            <Cell>
              <Input type="text" value={formatGia(value)} />
            </Cell>
          );
        } else {
          return (
            <Cell>
              <Input type="text" placeholder="Nhập mua KL" value={value} />
            </Cell>
          );
        }
      };
    } else if (e?.dataType?.toUpperCase() === "RIGHT_STATUS".toUpperCase()) {
      render = (value, data) => {
        return (
          <Cell>
            <StatusRight value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.key?.toUpperCase() === "period".toUpperCase() && e.dataType !== "RIGHT_STATUS") {
      render = (value, data) => {
        return (
          <Cell>
            <PeriodOrderDK value={value} data={data} />
          </Cell>
        );
      };
    } else if (e.dataType?.toUpperCase() === "PERCENT_VALUE".toUpperCase()) {
      render = (value, data) => {
        if (Number(value) && value) {
          return (
            <Cell>
              <Tooltip placement="top" title={`${formatGia(value)} %`}>
                <span>{`${formatGia(value)} %`}</span>
              </Tooltip>
            </Cell>
          );
        } else {
          return "--";
        }
      };
    }

    return {
      ...e,
      dataIndex: e.key,
      ellipsis: {
        showTitle: false,
      },
      render: render,
      scroll: { y: 150, x: 600 },
      children: Array.isArray([e?.children]) && e?.children?.length > 0 ? MapColumnsANT(e?.children) : null,
    };
  });
};

