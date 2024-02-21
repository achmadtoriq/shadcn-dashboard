'use client'
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const RealtimeDate = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().tz('Asia/Jakarta').format("MMMM Do YYYY, h:mm:ss a")
  );

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(moment().tz('Asia/Jakarta').format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  return (
    <>
      <div>
        <h1>Real-time Clock</h1>
        <p>Current time: {currentTime}</p>
      </div>
    </>
  );
};

export default RealtimeDate;
