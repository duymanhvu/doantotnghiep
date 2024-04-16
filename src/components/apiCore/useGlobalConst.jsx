import { useTranslation } from "react-i18next";
import moment from "moment";
import IMask from "imask";
const DATE_FORMAT = "DD/MM/YYYY";

export const DATE_MASKED = IMask.createMask({
    blocks: {
      DD: { from: 1, mask: IMask.MaskedRange, to: 31 },
      MM: { from: 1, mask: IMask.MaskedRange, to: 12 },
      YYYY: { from: 1900, mask: IMask.MaskedRange, to: Number.MAX_VALUE },
    },
    format: (date) => moment(date).format(DATE_FORMAT),
    mask: Date,
    parse: (date) => moment(date, DATE_FORMAT),
    pattern: DATE_FORMAT,
  });
export const useGlobalConst = () => {
    const { t } = useTranslation();
    return {
      APP: {
        UP: "UP",
        DOWN: "DOWN",
        IN_INPUT: "IN_INPUT",
      },
      ANT: {
        LOCALE: {
          dateFormat: "DD/MM/YYYY",
          dateTimeFormat: "M/D/YYYY h:mm:ss A",
          dateFormats: "DD/MM/YYYY hh:mm:ss",
          dateAll: "DD/MM/YYYY - HH:mm:ss",
          dateTimes: "HH:mm:ss",
          dateFormatDaysT: "YYYY-MM-DDTHH:mm:ss",
        },
        FORM: {
          RULES: {
            chiNhapEmail: {
              type: "email",
              message: t("khongDungDinhDangEmail"),
            },
            khongCoBatKyKhoangTrangNao: ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value?.trim().indexOf(" ") >= 0) {
                  return Promise.reject(new Error(t("khongCoKhoangTrangNao")));
                }
                return Promise.resolve();
              },
            }),
            khongNhapKyTuDacBietVaKhoangTrang: ({ getFieldValue }) => ({
              validator(_, value) {
                const regex = /^[^\s!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/;
  
                if (!regex.test(value)) {
                  return Promise.reject(new Error(t("khongDuocNhapKyTuDacBietVaKhoangTrang")));
                }
  
                return Promise.resolve();
              },
            }),
            gioiHanSoKyTu: (number) => ({
              pattern: new RegExp(`^[\\w\\W]{${1},${number}}$`),
              message: `${t("gioiHan")} ${number} ${t("kyTu")}`,
            }),
            yeuCauNhap: {
              required: true,
              message: t("khongDuocDeTrong"),
            },
            giaTriKhongDuocDeTrong: (title) => ({
              validator(_, value) {
                //&& value !== 0
                if (!value || value === "") {
                  return Promise.reject(new Error(`${title} ${t("khongDuocDeTrong2")}`));
                }
                return Promise.resolve();
              },
            }),
            khongDeTrongVaKhacKhong: (title) => ({
              validator(_, value) {
                //&& value !== 0
                if (Number(value) === 0 && value !== undefined && value !== null && value !== "") {
                  return Promise.reject(new Error(`${title} ${t("phaiKhac0")}.`));
                } else if (!value || value === "") {
                  return Promise.reject(new Error(`${title} ${t("khongDuocDeTrong2")}.`));
                }
                return Promise.resolve();
              },
            }),
            doDaiToiThieu: (title, index) => ({
              validator(_, value) {
                //&& value !== 0
                if (value && value !== "" && value?.length < index) {
                  return Promise.reject(new Error(`${title} ${`${t("phaiLonHonHoacBang2")} ${index} ${t("kyTu")}`}.`));
                }
                return Promise.resolve();
              },
            }),
            giaNhapNhoHonGiaTran: (giaTran) => ({
              validator(_, value) {
                if (value && value !== "" && !isNaN(value) && Number(value) > Number(giaTran)) {
                  return Promise.reject(new Error(t("giaDatPhaiNamTrongKhoangTranSan")));
                }
                return Promise.resolve();
              },
            }),
            nhapGiaChotLaiHoacCatLo: (prices) => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  // value = value + "";
                  var price = getFieldsValue()[prices];
                  if ((price === "" || !price) && (value === "" || !value)) {
                    return Promise.reject(new Error(t("canNhapGiaCatLoHoacGiaChotLai")));
                  }
                  return Promise.resolve();
                },
              });
            },
            giaNhapLonHonGiaSan: (giaSan) => ({
              validator(_, value) {
                if (value && value !== "" && !isNaN(value) && Number(value) < Number(giaSan)) {
                  return Promise.reject(new Error(t("giaDatPhaiNamTrongKhoangTranSan")));
                }
                return Promise.resolve();
              },
            }),
            khoiLuongLoChanLoLe: () => ({
              validator(_, value) {
                if (value && value !== "" && !isNaN(value) && Number(value) % 100 > 0 && Number(value) > 99) {
                  return Promise.reject(new Error(t("khoiLuongNhapPhaiLaLoChanHoacLoLe")));
                }
                return Promise.resolve();
              },
            }),
            khoiLuongLaLoChan: () => ({
              validator(_, value) {
                if (value && value !== "" && !isNaN(value) && Number(value) % 100 > 0) {
                  return Promise.reject(new Error(t("khoiLuongGiaoDichPhaiLaBoi")));
                }
                return Promise.resolve();
              },
            }),
            buocGiaHopLe: (marketCode) => ({
              validator(_, value) {
                let isCheck = false;
                let price = value;
  
                if (!isNaN(value)) price = (Number(value) * 1000).toFixed(0);
                if (marketCode === "STO") {
                  if (!isNaN(value)) {
                    if (price < 10000 && price % 10 > 0) {
                      isCheck = true;
                    } else if (price >= 10000 && price <= 49950 && price % 50 > 0) {
                      isCheck = true;
                    } else if (price >= 50000 && price % 100 > 0) {
                      isCheck = true;
                    }
                  }
                } else if (marketCode === "UPX" || marketCode === "STX") {
                  if (!isNaN(value)) {
                    if (price % 100 > 0) {
                      isCheck = true;
                    }
                  }
                }
                if (value && value !== "" && !isNaN(value) && isCheck) {
                  return Promise.reject(new Error(t("buocGiaKhongHopLe")));
                }
                return Promise.resolve();
              },
            }),
            bienDoGia: (marketCode, name) => ({
              validator(_, value) {
                let isCheck = false;
                let price = value;
  
                if (!isNaN(value)) price = (Number(value) * 1000).toFixed(0);
                if (marketCode === "STO") {
                  if (!isNaN(value)) {
                    if (price < 10000 && price % 10 > 0) {
                      isCheck = true;
                    }
                  }
                } else if (marketCode === "UPX" || marketCode === "STX") {
                  if (!isNaN(value)) {
                    if (price % 100 > 0) {
                      isCheck = true;
                    }
                  }
                }
                if (value && value !== "" && !isNaN(value) && isCheck) {
                  return Promise.reject(new Error(t(`${name} ${t("chiNhapSauPhanThapPhan")}`)));
                }
                return Promise.resolve();
              },
            }),
  
            chiNhapSo: () => ({
              validator(_, value) {
                if (value && !/^[0-9]+$/.test(value) === true) {
                  return Promise.reject(new Error(t("chiNhapSo")));
                }
                return Promise.resolve();
              },
            }),
            gioiHan: (number, min = 0) => ({
              pattern: new RegExp(`^[\\w\\W]{${min},${number}}$`),
              message: `${t("vuiLongNhapTu")} ${min} ${t("den")} ${number} ${t("kyTu")}`,
            }),
            sucMuaGioiHan: () => ({
              validator(_, value) {
                if (value) {
                  return Promise.reject(new Error(t("khongDuSucMuaDeDatLenh")));
                }
                return Promise.resolve();
              },
            }),
            ngayNhoHonSoSanh: (dateInput, title1, title2) => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  // value = value + "";
                  var date = getFieldsValue()[dateInput];
                  const date1 = moment(value, "DD/MM/YYYY");
                  const date2 = moment(date, "DD/MM/YYYY");
                  if (value && date && date1 > date2) {
                    if (!(value + "")?.includes("00010101") && value + "" != "0") {
                      return Promise.reject(new Error(`${title1} ${t("phaiNhoHonHoacBang")} ${title2}`));
                    }
                  }
                  return Promise.resolve();
                },
              });
            },
            ngayLonHonSoSanh: (dateInput, title1, title2) => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  // value = value + "";
                  var date = getFieldsValue()[dateInput];
                  const date1 = moment(value, "DD/MM/YYYY");
                  const date2 = moment(date, "DD/MM/YYYY");
                  if (value && date && date1 < date2) {
                    if (!(value + "")?.includes("00010101") && value + "" != "0") {
                      return Promise.reject(new Error(`${title1} ${t("phaiLonHonHoacBang")} ${title2}`));
                    }
                  }
                  return Promise.resolve();
                },
              });
            },
            ngayNhoHonSoSanh1: (dateInput, title1, title2) => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  // value = value + "";
                  var date = getFieldsValue()[dateInput];
                  const date1 = moment(value, "YYYYMMDD");
                  const date2 = moment(date, "YYYYMMDD");
                  if (value && date && date1 > date2) {
                    if (!(value + "")?.includes("00010101") && value + "" != "0") {
                      return Promise.reject(new Error(`${title1} ${t("phaiNhoHonHoacBang")} ${title2}`));
                    }
                  }
                  return Promise.resolve();
                },
              });
            },
            ngayLonHonSoSanh1: (dateInput, title1, title2) => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  // value = value + "";
                  var date = getFieldsValue()[dateInput];
                  const date1 = moment(value, "YYYYMMDD");
                  const date2 = moment(date, "YYYYMMDD");
                  if (value && date && date1 < date2) {
                    if (!(value + "")?.includes("00010101") && value + "" != "0") {
                      return Promise.reject(new Error(`${title1} ${t("phaiLonHonHoacBang")} ${title2}`));
                    }
                  }
                  return Promise.resolve();
                },
              });
            },
            nhapSoLonHon: (keyName, title1 = "", title2 = "") => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  var value2 = getFieldsValue()[keyName];
                  if (value && value !== "" && !isNaN(value) && value2 && value2 !== "" && !isNaN(value2)) {
                    if (Number(value) <= Number(value2)) return Promise.reject(new Error(`${title1} ${t("phaiLonHon")} ${title2}`));
                  }
                  return Promise.resolve();
                },
              });
            },
            nhapSoNhoHon: (keyName, title1 = "", title2 = "") => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  var value2 = getFieldsValue()[keyName];
                  if (value && value !== "" && !isNaN(value) && value2 && value2 !== "" && !isNaN(value2)) {
                    if (Number(value) >= Number(value2)) return Promise.reject(new Error(`${title1} ${t("phaiNhoHon")} ${title2}`));
                  }
                  return Promise.resolve();
                },
              });
            },
            nhapSoNhoHonHoacBang: (keyName, title1 = "", title2 = "") => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  var value2 = getFieldsValue()[keyName];
                  if (value && value !== "" && !isNaN(value) && value2 && value2 !== "" && !isNaN(value2)) {
                    if (Number(value) > Number(value2)) return Promise.reject(new Error(`${t("phaiNhoHonHoacBang")} ${title2}`));
                  }
                  return Promise.resolve();
                },
              });
            },
            chuaChuHoaChuThuongVaSo: () => ({
              validator(_, value) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  
                if (!regex.test(value)) {
                  return Promise.reject(new Error(t("yeuCauChuaItNhatMotChuHoa")));
                }
  
                return Promise.resolve();
              },
            }),
            checkValidateNewPassword: () => ({
              validator(_, value) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
                const regexSpecial = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).*$/;
  
                if (value || value === "") {
                  if (value.length < 8 || value.length > 32) {
                    return Promise.reject(new Error(t("doDaiPhaiTu832KyTu")));
                  } else if (value.indexOf(" ") >= 0) {
                    return Promise.reject(new Error(t("khongBaoGomKhoangTrang")));
                  } else if (!regexSpecial.test(value) || !regex.test(value)) {
                    return Promise.reject(new Error(t("matKhauPhaiBaoGom")));
                  }
                }
  
                return Promise.resolve();
              },
            }),
            validateAccount: () => {
              return ({ getFieldsValue }) => ({
                validator(_, value) {
                  if (value === null || value === undefined || value === "") {
                    return Promise.reject(new Error(t("soTaiKhoanKhongDuocDeTrong")));
                  }
                  const isEmptyArray = (arr) => arr.every((item) => item.trim() === "");
                  if (isEmptyArray(value)) {
                    return Promise.reject(new Error(t("soTaiKhoanKhongDuocDeTrong")));
                  }
                  if (value && value !== "") {
                    let isChecked = false;
                    for (let i = 1; i < 6; i++) {
                      let newValue = value[i];
                      if (!newValue || !newValue === "") {
                        isChecked = true;
                      }
                    }
                    if (isChecked) {
                      return Promise.reject(new Error(t("soTaiKhoanPhaiDu6KyTu")));
                    }
                  }
                  return Promise.resolve();
                },
              });
            },
          },
          ITEM: {
            PARSER: {
              DATE_FROM_NUMBER: {
                getValueProps: (i) => ({
                  value: i && i != 0 && (typeof i !== "string" || (!i.includes("00010101") && i != "0")) ? moment(i, "YYYYMMDD") : undefined,
                }),
                normalize: (val) => val?.format("YYYYMMDD") ?? undefined,
                onKeyDown: (event) => {
                  const input = event.target;
                  input.value = DATE_MASKED.resolve(input.value);
                },
              },
              DATE_FROM_DATE: {
                getValueProps: (i) => ({
                  value: i && i != 0 && (typeof i !== "string" || (!i.includes("00010101") && i != "0")) ? moment(i, "DD/MM/YYYY") : undefined,
                }),
                normalize: (val) => val?.format("DD/MM/YYYY") ?? undefined,
                onKeyDown: (event) => {
                  const input = event.target;
                  input.value = DATE_MASKED.resolve(input.value);
                },
              },
            },
            INPUT: {
              SELECT_COMPLEX_SEARCH: {
                showSearch: true,
                getPopupContainer: (trigger) => trigger.parentElement,
                onDropdownVisibleChange: (visible) => {},
                onInputKeyDown: (e) => {},
                filterOption: (input, option) => {
                  let str = "";
                  if (option.plainText && typeof option.plainText === "string") {
                    str = option.plainText?.toLowerCase();
                  } else if (Array.isArray(option.children)) {
                    str = option.children
                      .filter((e) => typeof e === "string")
                      .join("")
                      .toLowerCase();
                  } else {
                    if (option.children && typeof option.children === "string") {
                      str = option.children.toLowerCase();
                    } else {
                      if (typeof option.label === "string") {
                        str = option.label?.toLowerCase();
                      } else {
                        str = "";
                      }
                    }
                  }
                  var regex = /\d+/g;
                  if (input.match(regex) && input.match(regex)[0] !== "") {
                    return (str ?? "").toLowerCase().includes(input.toLowerCase());
                  }
                  return (str ?? "").toLowerCase().includes(input.toLowerCase());
                },
              },
            },
          },
        },
      },
      MODULE: {},
      ITEM: {
        INPUT: {
          SELECT_COMPLEX_SEARCH: {
            placeholder: t("luaChon"),
            showSearch: true,
            getPopupContainer: (trigger) => trigger.parentElement,
            onDropdownVisibleChange: (visible) => {},
            onBlur: (e) => {},
            onFocus: (e) => {},
            onInputKeyDown: (e) => {},
            filterOption: (input, option) => {
              let str = "";
              if (option.plainText && typeof option.plainText === "string") {
                str = option.plainText?.toLowerCase();
              } else if (Array.isArray(option.children)) {
                str = option.children
                  .filter((e) => typeof e === "string")
                  .join("")
                  .toLowerCase();
              } else {
                if (option.children && typeof option.children === "string") {
                  str = option.children.toLowerCase();
                } else {
                  if (typeof option.label === "string") {
                    str = option.label?.toLowerCase();
                  } else {
                    str = "";
                  }
                }
              }
              var regex = /\d+/g;
              if (input.match(regex) && input.match(regex)[0] !== "") {
                return (str ?? "").toLowerCase().includes(input.toLowerCase());
              }
              return (str ?? "").toLowerCase().includes(input.toLowerCase());
            },
          },
          SELECT_KEY: {
            placeholder: t("luaChon"),
            showSearch: true,
            getPopupContainer: (trigger) => trigger.parentElement,
            onDropdownVisibleChange: (visible) => {},
            onBlur: (e) => {},
            onFocus: (e) => {},
            onInputKeyDown: (e) => {},
            filterOption: (input, option) => {
              return option?.value.toUpperCase().startsWith(input.toUpperCase());
            },
          },
        },
      },
    };
  };