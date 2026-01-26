"use client";
import { useEffect, useState } from "react";

export function useLandscapeOnly() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");

    const update = () => setIsLandscape(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isLandscape;
}
