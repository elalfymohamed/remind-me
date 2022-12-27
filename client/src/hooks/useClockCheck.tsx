import { useEffect, useState } from "react";

export default function useClockCheck() {
  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      let nd = new Date().toLocaleTimeString();

      setClock(nd);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return clock;
}
