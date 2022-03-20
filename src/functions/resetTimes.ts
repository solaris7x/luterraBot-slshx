import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";

export interface resetTimesType {
  dailyResetETA: string;
  weeklyResetETA: string;
}

const resetTimes = (): resetTimesType => {
  // Extend dayjs plugins
  dayjs.extend(utc);
  dayjs.extend(duration);
  dayjs.extend(isoWeek);
  dayjs.extend(relativeTime);

  // Get current time in UTC
  const dateUTCnow = dayjs.utc();
  // Set 10 am in UTC
  let dateUTCDaily = dayjs.utc().hour(10).minute(0).second(0).millisecond(0);
  // If past 10 am, set to next day
  if (dateUTCDaily.isBefore(dateUTCnow)) {
    dateUTCDaily = dateUTCDaily.add(1, "day");
  }
  // Get duration until 10 am
  const dailyResetETA = dayjs
    .duration(dateUTCDaily.diff(dateUTCnow))
    .format("HH:mm:ss");

  // Set Thursday at 10 am in UTC
  let dateUTCWeekly = dayjs
    .utc()
    .day(4)
    .hour(10)
    .minute(0)
    .second(0)
    .millisecond(0);

  // If past this week thursday 10 am, set to next week
  if (dateUTCWeekly.isBefore(dateUTCnow)) {
    dateUTCWeekly = dateUTCWeekly.add(1, "week");
  }

  // Get duration until next Thursday at 10 am
  let weeklyResetETA = dateUTCnow.to(dateUTCWeekly, true);

  //Weekly time left is less than a day
  if (dayjs.duration(dateUTCWeekly.diff(dateUTCnow)).asDays() < 1) {
    weeklyResetETA = dayjs
      .duration(dateUTCWeekly.diff(dateUTCnow))
      .format("HH:mm:ss");
  }

  return {
    dailyResetETA,
    weeklyResetETA,
  };
};

export default resetTimes;
