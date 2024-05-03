import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import scroll_down from "../../../assets/img/ic_scroll_down.svg";

const genarateSlotLabel = (value) => {
  if (!value) return "";
  if (value === "07") {
    return "Sáng";
  }
  if (value === "12") {
    return "Chiều";
  }
  if (value === "17") {
    return "Tối";
  }
};

const events = [
  {
    id: 1,
    title: " Lịch học Toán",
    start: "2024-05-01T09:30:00",
    end: "2024-05-01T10:30:00",
  },
  {
    id: 2,
    title: " Lịch học Văn",
    start: "2024-05-01T10:30:00",
    end: "2024-05-01T11:30:00",
  },
  {
    id: 3,
    title: " Lịch học Tiếng anh",
    start: "2024-05-01T11:30:00",
    end: "2024-05-01T12:30:00",
  },
  { title: "Meeting", start: new Date() },
];

export function CalendarSchedule() {
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
          events={events}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
