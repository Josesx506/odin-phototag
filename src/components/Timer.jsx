'use client';

import { useState, useEffect } from "react";
import { formatTime } from "./utils";

export default function Timer({ active, timeRef }) {
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setGameTime(prev => {
        const next = prev + 1;
        timeRef.current = next;
        return next;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div>⏱️ Time: {formatTime(gameTime)}</div>
  )
}
