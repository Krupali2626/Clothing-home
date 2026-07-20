import React, { useEffect, useState } from "react";
import "./FlashSaleTimer.css";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const FlashSaleTimer = () => {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 8); // 8 hour countdown
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="d_flash_timer">
      <span className="d_flash_timer_label">Ends in</span>
      <div className="d_flash_timer_units">
        <span className="d_flash_unit">{pad(time.hours)}<small>h</small></span>
        <span className="d_flash_sep">:</span>
        <span className="d_flash_unit">{pad(time.minutes)}<small>m</small></span>
        <span className="d_flash_sep">:</span>
        <span className="d_flash_unit">{pad(time.seconds)}<small>s</small></span>
      </div>
    </div>
  );
};

export default FlashSaleTimer;
