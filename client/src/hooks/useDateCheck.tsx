import { useEffect } from "react";
import { format, parseISO, isBefore } from "date-fns";

export default function useClockCheck() {
  let nd = new Date();
  let date = {
    day: format(nd, "dd"),
    dayDisplay: format(nd, "d"),
    month: format(nd, "MM"),
    monthDisplay: format(nd, "MMM"),
    year: format(nd, "y"),
    weekday: format(nd, "EEEE"),
  };
  const storedDate = parseISO(`${date.year}-${date.month}-${date.day}`);
  useEffect(() => {
    const interval = setInterval(() => {
      let nd = new Date();
      let currentDate = parseISO(
        `${format(nd, "y")}-${format(nd, "MM")}-${format(nd, "dd")}`
      );

      if (isBefore(storedDate, currentDate)) {
        window.location.reload();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [storedDate]);

  return date;
}
