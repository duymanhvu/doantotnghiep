import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import scroll_down from "../../../assets/img/ic_scroll_down.svg";
import { Form, Input, Select } from "antd";
import { useAxios } from "../../apiCore/apiHelper";
import { convertToArray } from "../../apiCore/convertObject";
import { useEffect, useState } from "react";
import { useShareOrderApi } from "../../apiCore/apiProcess";
import { toast } from "react-toastify";
const { Option } = Select;
const genarateSlotLabel = (value) => {
  if (!value) return "";
  if (value === "07") {
    return (
      <>
        <p>Sáng</p>
        <span>Ca 1</span>
      </>
    );
  }
  if (value === "12") {
    return (
      <>
        <p>Chiều</p>
        <span>Ca 2</span>
      </>
    );
  }
  if (value === "17") {
    return (
      <>
        <p>Tối</p>
        <span>Ca 3</span>
      </>
    );
  }
};

export function CalendarSchedule() {
  const [formCASign] = Form.useForm();
  const axios = useAxios();
  const AxiosAPI = useShareOrderApi();
  const [listRoom, setListRoom] = useState([]);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    AxiosAPI.getClassRoomGetList()
      .then((res) => {
        if (res.status === 200) {
          setListRoom(convertToArray(res?.data?.Data));
        } else {
          setListRoom([]);
        }
      })
      .catch(function (err) {
        setListRoom([]);
      });
  }, []);

  const handleSearch = async () => {
    formCASign.submit();
    formCASign
      .validateFields()
      .then(async (values) => {
        const classId = values?.ClassroomNo;
        const startDate = values?.StartDate;
        const endDate = values?.EndDate;
        if (values) {
          const response = await axios.get(
            `/api/Schedule/GetSchedulesByClass?classId=${classId}&startDate=${startDate}&endDate=${endDate}`
          );
          if (response.data?.StatusCode > 0) {
            toast.success("Tìm kiếm thành công");
            setListData(
              convertToArray(response?.data?.Data).map((item) => ({
                id: item?.Id,
                title: item?.Title + item?.Classroom?.Teacher?.Fullname,
                start: item?.StartTime,
                end: item?.EndTime,
                description: "abc",
              }))
            );
          } else {
            toast.error("Error!");
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response !== undefined) {
          toast.error("Error!");
        }
      });
  };
  const handleFinishForm = () => {
    formCASign.validateFields().then((values) => {});
  };
  return (
    <div className="registration">
      <div className="registration__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Schedule</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>
        <Form
          id="form"
          className="form"
          form={formCASign}
          onFinish={handleFinishForm}
        >
          <div className="registration__form">
            <div className="registration__form-wrap">
              <div className="heading v1 text-center"></div>
              <div className="heading v2">Thông Tin</div>
              <Form.Item name={"Id"} hidden></Form.Item>
              <div className="row">
                <div className="col-lg-4">
                  <Form.Item
                    label={"Tên Phòng"}
                    name={"ClassroomNo"}
                    className="req"
                  >
                    <Select className="select--modify" placeholder="Choose">
                      {convertToArray(listRoom).map((e, key) => (
                        <Option key={key} value={e.Id}>
                          {e.ClassroomNo}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item
                    label={"Ngày bắt đầu"}
                    name={"StartDate"}
                    className="req"
                  >
                    <Input type="date" />
                  </Form.Item>
                </div>

                <div className="col-lg-4">
                  <Form.Item
                    label={"Ngày kết thúc"}
                    name={"EndDate"}
                    className="req"
                  >
                    <Input type="date" />
                  </Form.Item>
                </div>
                <div className="col-lg-4">
                  <Form.Item label={"Thao tác"} className="req">
                    <button
                      className="btn btn-action"
                      type="submit"
                      onClick={handleSearch}
                    >
                      {<span>Tìm kiếm</span>}
                    </button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <FullCalendar
          locale={"vi"}
          timeZone="local"
          allDaySlot={false}
          slotDuration={"5:00:00"}
          slotMinTime={"07:00:00"}
          slotMaxTime={"21:00:00"}
          contentHeight={950}
          eventMinHeight={40}
          slotLabelContent={(e) => {
            return genarateSlotLabel(e.text);
          }}
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={false}
          events={listData}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <br />
      <i>{eventInfo.event.extendedProps.description}</i>
    </>
  );
}
