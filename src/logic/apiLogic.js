import moment from "moment";
import { v4 as uuidv4 } from "uuid";

let beginingSemesterDay = new Date(2021, 8, 27, 8, 45);
let numberofWeeks = 12;
let momentSemesterDay = moment(beginingSemesterDay);

const calculateSemester = (
  beginingDate = momentSemesterDay,
  weekNumber = numberofWeeks
) => {
  return new Array(weekNumber)
    .fill(beginingDate)
    .map((week, idx) => calculateWeek(moment(week).add(idx, "week"), idx));
};

const calculateWeek = (beginingDate = momentSemesterDay, weekNumber = 12) => {
  return {
    [`week${weekNumber + 1}`]: new Array(5)
      .fill(beginingDate)
      .map((day, idx) => calculateDay(moment(day).add(idx, "day"))),
  };
};

const calculateDay = (day) => {
  let duration = 0;
  return {
    [moment(day).format("dddd, Do MMMM YYYY")]: new Array(21)
      .fill(day)
      .map((day, idx) =>
        (idx % 3 === 0) & (idx !== 0)
          ? {
              id: uuidv4(),
              time: moment(day)
                .add((duration = duration + 15), "minute")
                .format("HH:mm"),
              subject: null,
            }
          : idx === 0
          ? {
              id: uuidv4(),
              time: moment(day).add(0, "minute").format("HH:mm"),
              subject: null,
            }
          : {
              id: uuidv4(),
              time: moment(day)
                .add((duration = duration + 45), "minute")
                .format("HH:mm"),
              subject: null,
            }
      ),
  };
};

const addMinutes = (minutes) => {
  return moment(
    new Date(2021, 1, 1, minutes.split(":")[0], minutes.split(":")[1])
  )
    .add(90, "minutes")
    .format("HH:mm");
};

export { calculateSemester, addMinutes };
