import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const ComingSoon = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2023-12-01") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      style={{
        backgroundImage: `url("/landingpage.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "125vh",
      }}
    >
      <Typography variant="h1" marginTop="-50px">
        Coming Soon...
      </Typography>
      <Typography
        variant="h2"
        color="white"
        marginTop="75px"
      >{`${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Minutes ${timeLeft.seconds} Seconds`}</Typography>
      <Typography variant="h3" color="white" marginTop="75px">
        Stay Tuned!
      </Typography>
      <Typography variant="h4" color="white">
        12.01.2023
      </Typography>
    </div>
  );
};

export default ComingSoon;
