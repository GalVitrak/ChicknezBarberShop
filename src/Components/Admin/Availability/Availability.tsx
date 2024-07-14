import "./Availability.css";
import { Calendar, Modal, TimePicker } from "antd";

import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AvailabilityModel from "../../../Models/AvailabilityModel";
import adminService from "../../../Services/AdminService";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Loading } from "../../Layout/Loading/Loading";

function Availability(): JSX.Element {
  const [dayOff, setDayOff] = useState<number>();
  const [dayOffLoading, setDayOffLoading] = useState<boolean>(false);
  const [loadingAvailability, setLoadingAvailability] =
    useState<boolean>(false);

  const [selectedDay, setSelectedDate] = useState<string>(
    new Date().getDate() + ""
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth() + 1 + ""
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear() + ""
  );
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [availability, setAvailability] = useState<AvailabilityModel[]>([]);

  useEffect(() => {
    getAvailability();
    getDayOff();
  }, [selectedMonth, selectedYear]);

  const getAvailability = async () => {
    setLoadingAvailability(true);
    console.log("cyka1");

    const newAvailability = await adminService.getAvailability(
      selectedMonth,
      selectedYear
    );
    setAvailability(newAvailability);
    setLoadingAvailability(false);
  };

  const getDayOff = async () => {
    setDayOffLoading(true);
    console.log("cyka2");

    const newDayOff = await adminService.getDayOff();
    setDayOff(newDayOff);
    setDayOffLoading(false);
  };

  const handleSelect = (value: Dayjs) => {
    setSelectedDate(value.format("D"));
    setSelectedMonth(value.format("M"));
    setSelectedYear(value.format("YYYY"));
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newAvailability = new AvailabilityModel(
      selectedDay,
      selectedMonth,
      selectedYear,
      startTime,
      endTime
    );
    adminService.setAvailability(newAvailability);
    availability.push(newAvailability);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cellRender = (value: Dayjs) => {
    if (value.day() === 6) {
      return (
        <div className="cell">
          <span>שבת</span>
        </div>
      );
    }

    if (dayOffLoading) {
      return (
        <div className="cell">
          <Loading />
        </div>
      );
    } else {
      if (value.day() === dayOff) {
        return (
          <div className="cell">
            <span>יום חופש</span>
          </div>
        );
      }
    }
    const day = value.format("D");
    const month = value.format("M");
    const year = value.format("YYYY");
    const availabilityDay = availability.find(
      (a) => a.day === day && a.month === month && a.year === year
    );

    return (
      <div className="cell">
        {loadingAvailability ? (
          <Loading />
        ) : (
          <div className="cell">
            {availabilityDay ? (
              <div className="cellContext">
                <div className="cellButtons">
                  <div className="edit">
                    <EditOutlined />
                  </div>
                  <div className="delete">
                    <DeleteOutlined
                      onClick={async () => {
                        await adminService.deleteAvailability(
                          availabilityDay.id || ""
                        );
                        setAvailability(
                          availability.filter(
                            (a) => a.id !== availabilityDay.id
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                {availabilityDay.startTime} עד {availabilityDay.endTime}
              </div>
            ) : (
              <div className="cellContext">
                <div className="cellButton">
                  <div className="add">
                    <PlusSquareOutlined
                      onClick={() => {
                        handleSelect(value);
                      }}
                    />
                  </div>
                </div>
                <span>לא עודכנה זמינות</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  function updateDayOff(day: number) {
    setDayOff(day);
    adminService.setDayOff(day);
  }

  return (
    <>
      <div className="Availability">
        <div className="dayOff">
          {dayOffLoading ? (
            <Loading />
          ) : (
            <>
              <label>יום חופש:</label>
              <select
                onChange={(e) => {
                  updateDayOff(parseInt(e.target.value));
                }}
                value={dayOff}
              >
                <option value="0">ראשון</option>
                <option value="1">שני</option>
                <option value="2">שלישי</option>
                <option value="3">רביעי</option>
                <option value="4">חמישי</option>
                <option value="5">שישי</option>
              </select>
            </>
          )}
        </div>
        <Calendar
          style={{
            opacity: "85%",
            height: "70vh",
            width: "75%",
            borderRadius: "10px",
            textAlign: "center",
            direction: "rtl",
            overflow: "auto",
          }}
          onPanelChange={(value) => {
            setSelectedMonth(value.format("M"));
            setSelectedYear(value.format("YYYY"));
          }}
          dateCellRender={cellRender}
          locale={{
            lang: {
              locale: "he_IL",
              placeholder: "בחר תאריך",
              rangePlaceholder: ["תאריך התחלה", "תאריך סיום"],
              today: "היום",
              now: "כעת",
              backToToday: "חזור להיום",
              ok: "סבבה",
              clear: "נקה",
              month: "חודש",
              year: "שנה",
              timeSelect: "בחר זמן",
              dateSelect: "בחר תאריך",
              monthSelect: "בחר חודש",
              yearSelect: "בחר שנה",
              decadeSelect: "בחר עשור",
              yearFormat: "YYYY",
              dateFormat: "D/M/YYYY",
              dayFormat: "D",
              dateTimeFormat: "D/M/YYYY HH:mm:ss",
              monthFormat: "MMMM",
              monthBeforeYear: true,
              previousMonth: "חודש קודם (PageUp)",
              nextMonth: "חודש הבא (PageDown)",
              previousYear: "שנה שעברה (Control + left)",
              nextYear: "שנה הבאה (Control + right)",
              previousDecade: "עשור קודם",
              nextDecade: "עשור הבא",
              previousCentury: "מאה קודמת",
              nextCentury: "מאה הבאה",
              shortWeekDays: [
                "ראשון",
                "שני",
                "שלישי",
                "רביעי",
                "חמישי",
                "שישי",
                "שבת",
              ],
              shortMonths: [
                "ינואר",
                "פברואר",
                "מרץ",
                "אפריל",
                "מאי",
                "יוני",
                "יולי",
                "אוגוסט",
                "ספטמבר",
                "אוקטובר",
                "נובמבר",
                "דצמבר",
              ],
            },
            timePickerLocale: {
              placeholder: "בחר זמן",
            },
            dateFormat: "D-M-YYY",
            dateTimeFormat: "D-M-YYY HH:mm:ss",
            weekFormat: "YYYY-wo",
            monthFormat: "YYYY-MM",
          }}
        />
      </div>
      <Modal
        title="הגדר זמינות"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TimePicker.RangePicker
          placeholder={["התחלה", "סיום"]}
          style={{ direction: "ltr" }}
          format={"HH:mm"}
          onChange={(time, timeString) => {
            setStartTime(timeString[0]);
            setEndTime(timeString[1]);
          }}
        />
      </Modal>
    </>
  );
}

export default Availability;
