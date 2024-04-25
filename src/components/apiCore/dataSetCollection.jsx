/** @format */

import { Badge, Dropdown, Input, Menu, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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


export const PriceOrder = ({ value, data }) => {
  return (
    <Tooltip placement="top" title={!isNaN(value) ? Number(value) / 1000 : value}>
      <span>{!isNaN(value) ? Number(value) / 1000 : value}</span>
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
    if (e.key?.toUpperCase() === "SUBJECT".toUpperCase()) {
      render = (value, data) => {
        console.log(value, data,"kkkkkkkkkkkkkkkkkkkkkkkkkkk");
        return (
          <Cell>
            <Tooltip placement="top" title={value}>
              <span> {value}</span>
            </Tooltip>
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
    }  else if (e.dataType?.toUpperCase() === "PERCENT_VALUE".toUpperCase()) {
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

