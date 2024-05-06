import "./Availability.css";
import {
  Calendar,
  ConfigProvider,
  Modal,
  TimePicker,
} from "antd";
import heIL from "antd/locale/he_IL";

import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AvailabilityModel from "../../../Models/AvailabilityModel";
import adminService from "../../../Services/AdminService";
import { LoadingOutlined } from "@ant-design/icons";

function Availability(): JSX.Element {
  const [
    loadingAvailability,
    setLoadingAvailability,
  ] = useState<boolean>(false);

  const [selectedDay, setSelectedDate] =
    useState<string>(new Date().getDate() + "");
  const [selectedMonth, setSelectedMonth] =
    useState<string>(
      new Date().getMonth() + 1 + ""
    );
  const [selectedYear, setSelectedYear] =
    useState<string>(
      new Date().getFullYear() + ""
    );
  const [startTime, setStartTime] =
    useState<string>("");
  const [endTime, setEndTime] =
    useState<string>("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [availability, setAvailability] =
    useState<AvailabilityModel[]>([]);

  const getAvailability = async () => {
    setLoadingAvailability(true);
    setAvailability(
      await adminService.getAvailability(
        selectedMonth,
        selectedYear
      )
    );
    setLoadingAvailability(false);
  };

  useEffect(() => {
    getAvailability();
  }, [selectedMonth, selectedYear]);

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
    const availability = new AvailabilityModel(
      selectedDay,
      selectedMonth,
      selectedYear,
      startTime,
      endTime
    );
    adminService.setAvailability(availability);
    getAvailability();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cellRender = (value: Dayjs) => {
    const day = value.format("D");
    const availabilityDay = availability.find(
      (a) => a.day === day
    );

    return (
      <div>
        {loadingAvailability ? (
          <LoadingOutlined />
        ) : (
          <div>
            {availabilityDay ? (
              <div
                style={{ textAlign: "center" }}
              >
                {availabilityDay.startTime} עד{" "}
                {availabilityDay.endTime}
              </div>
            ) : (
              <div
                style={{ textAlign: "center" }}
              >
                חופש
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="Availability">
        <Calendar
          onSelect={handleSelect}
          style={{
            direction: "rtl",
            textAlign: "center",
          }}
          cellRender={cellRender}
          locale={{
            lang: {
              locale: "he_IL",
              placeholder: "בחר תאריך",
              rangePlaceholder: [
                "תאריך התחלה",
                "תאריך סיום",
              ],
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
              previousYear:
                "שנה שעברה (Control + left)",
              nextYear:
                "שנה הבאה (Control + right)",
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
