import moment from "moment";

const MergeDateTime = ({ date, time }) => {
  const selectedMixDate = moment(date, "ddd MMM DD YYYY HH:mm:ss").utc();
  const startTime = moment(time, "HH:mm");
  selectedMixDate.hours(startTime.hours());
  selectedMixDate.minutes(startTime.minutes());
  const mixedDateTime = selectedMixDate.format("ddd MMM DD YYYY HH:mm");

  return mixedDateTime;
};

const LecturesTime = ({ startTime, endTime, date }) => {
  const startDate = MergeDateTime({ date: date, time: startTime });
  const end = MergeDateTime({ date: date, time: endTime });
  const interval = moment(end).diff(startDate, "minutes");
  const endDate = interval > 0 ? end : moment(end).add(1, "day");
  return { startDate, endDate };
};

export { MergeDateTime, LecturesTime };
