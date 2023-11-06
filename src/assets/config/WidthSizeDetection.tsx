import React, { useState, useEffect } from "react";

const WidthSizeDetection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mediumDevice, setMediumDevice] = useState<boolean>(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1920) {
      setMediumDevice(true);
    }
  }, [windowWidth]);

  return { mediumDevice, windowWidth };
};

export default WidthSizeDetection;
