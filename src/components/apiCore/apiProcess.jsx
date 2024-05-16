import { useAxiossss } from "../../contexts/AuthContext";
import { useAxios } from "./apiHelper";
const ftv = (val) => {
  if (val === null || val === "" || val === undefined) return undefined;
  return val;
};
export const useShareOrderApi = () => {
  const httpRequest = useAxios();
  return {
    getClassRoomGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Classroom/GetList`, params);
    },
    getScheduleGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Schedule/GetList`, params);
    },
    getClassRoomGetListRoom: (jsonData) => {
      return httpRequest.get(`/api/Classroom/GetClassroomFacility`, jsonData);
    },
    getClassRoomInsert: (jsonData) => {
      return httpRequest.post(`/api/Classroom/Insert`, jsonData);
    },
    getClassRoomUpdate: (jsonData) => {
      return httpRequest.post(`/api/Classroom/Update`, jsonData);
    },
    getClassRoomDetele: (jsonData) => {
      return httpRequest.post(`/api/Classroom/Delete`, jsonData);
    },
    getParentGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Parent/GetList`, params);
    },
    getParentGetById: (jsonData) => {
      return httpRequest.get(`/api/Parent/GetById`, jsonData);
    },
    getParentInsert: (jsonData) => {
      return httpRequest.post(`/api/Parent/Insert`, jsonData);
    },
    getParentUpdate: (jsonData) => {
      return httpRequest.post(`/api/Parent/Update`, jsonData);
    },
    getParentDetele: (jsonData) => {
      return httpRequest.post(`/api/Parent/Delete`, jsonData);
    },
    getStudentGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Student/GetFilter`, params);
    },
    getTeacherGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Teacher/GetList`, params);
    },
    getSubjectGetList: () => {
      const params = {
        pageSize: 20,
        pageIndex: 1,
        sortBy: "Id",
        orderBy: "desc",
        keyword: "",
      };

      return httpRequest.post(`/api/Subject/GetList`, params);
    },
    getAllCode: (jsonData) => {
      const { cdType, cdCode } = jsonData;
      return httpRequest.get(`/HomeMobile/GetAllCode?CDTYPE=${cdType}&CDCODE=${cdCode}`);
    },
    getListOrder: (jsonData) => {
      let postData = {};
      for (let prop in jsonData) {
        if (!ftv(jsonData[prop])) {
          postData[prop] = undefined;
        } else {
          postData[prop] = jsonData[prop];
        }
      }

      const { custodycd, acctno = "ALL", form, to, symbol = "ALL", startDate, endDate, exectype = "ALL", orstatus = "ALL", sort = "TXDATE DESC" } = postData;
      return httpRequest.get(
        `/Order/SearchListOrder?CustodyCD=${custodycd}&Acctno=${acctno}${startDate ? "&StartDate=" + startDate : ""}${endDate ? "&EndDate=" + endDate : ""}${symbol ? "&Symbol=" + symbol : ""}${exectype ? "&ExecType=" + exectype : ""}${
          orstatus ? "&Orstatus=" + orstatus : ""
        }${sort ? "&sort=" + sort : ""}&from=${form}&to=${to}`
      );
    },
    getListOfDebts: (jsonData) => {
      const { custodycd, Acctno = "ALL", fromDate, toDate, sort = "DUEDATE DESC", form, to } = jsonData;
      return httpRequest.get(`/Cash/GetLoanContract?Custodycd=${custodycd}&Acctno=${Acctno}${fromDate ? "&Fromdate=" + fromDate : ""}${toDate ? "&Todate=" + toDate : ""}${sort ? "&sort=" + sort : ""}&from=${form}&to=${to}`);
    },
    getListOfTransfer: (jsonData) => {
      let postData = {};
      for (let prop in jsonData) {
        if (!ftv(jsonData[prop])) {
          postData[prop] = undefined;
        } else {
          postData[prop] = jsonData[prop];
        }
      }

      const { custodycd, acctno = "ALL", startDate, endDate, form, to } = postData;
      return httpRequest.get(`/Cash/GetListMoneyStatement?CustodyCD=${custodycd}&Acctno=${acctno}${startDate ? "&StartDate=" + startDate : ""}${endDate ? "&EndDate=" + endDate : ""}&from=${form}&to=${to}`);
    },
    getListOfSecurities: (jsonData) => {
      let postData = {};
      for (let prop in jsonData) {
        if (!ftv(jsonData[prop])) {
          postData[prop] = undefined;
        } else {
          postData[prop] = jsonData[prop];
        }
      }

      const { custodycd, acctno = "ALL", startDate, endDate, TransactionType = "ALL", symbol = "ALL", form, to } = postData;
      return httpRequest.get(
        `/Assets/SecuritiesStatement?custodycd=${custodycd}&AccTno=${acctno}${startDate ? "&StartDate=" + startDate : ""}${endDate ? "&EndDate=" + endDate : ""}${symbol ? "&Symbol=" + symbol : ""}${
          TransactionType ? "&TransactionType=" + TransactionType : ""
        }&from=${form}&to=${to}`
      );
    },
    getListOfProfitLoss: (jsonData) => {
      let postData = {};
      for (let prop in jsonData) {
        if (!ftv(jsonData[prop])) {
          postData[prop] = undefined;
        } else {
          postData[prop] = jsonData[prop];
        }
      }
      const { acctno = "ALL", fromDate, toDate, symbol = "ALL", form, to } = jsonData;
      return httpRequest.get(`/Assets/GetGainOrLost?AccTno=${acctno}${fromDate ? "&FromDate=" + fromDate : ""}${toDate ? "&ToDate=" + toDate : ""}${symbol ? "&Symbol=" + symbol : "&Symbol=ALL"}&from=${form}&to=${to}`);
    },
    getInfoOfProfitLoss: (jsonData) => {
      let postData = {};
      for (let prop in jsonData) {
        if (!ftv(jsonData[prop])) {
          postData[prop] = undefined;
        } else {
          postData[prop] = jsonData[prop];
        }
      }
      const { acctno = "ALL", fromDate, toDate, symbol = "ALL", form, to } = jsonData;
      return httpRequest.get(`/Assets/GetPerformance?AccTno=${acctno}${fromDate ? "&FromDate=" + fromDate : ""}${toDate ? "&ToDate=" + toDate : ""}${symbol ? "&Symbol=" + symbol : ""}&from=${form}&to=${to}`);
    },
    getCheckFivePercent: (jsonData) => {
      let postData = {
        orderType: jsonData?.orderType,
        accTno: jsonData?.accTno,
        stockSymbol: jsonData?.stockSymbol,
        quantity: jsonData?.quantity,
        orderId: jsonData?.orderId ? jsonData?.orderId : undefined,
      };

      return httpRequest.post(`/Order/CheckFivePercent`, postData);
    },
    getListCaSign: (jsonData) => {
      console.log(jsonData);
      return httpRequest.get(`/api/CA-Sign/CA-Sign-Registration-View?pCustId=${jsonData.custodyCD}`);
    },
  };
};
