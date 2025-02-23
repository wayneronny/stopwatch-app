import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './App.css';

const Timer = () => {
  const savedTime = parseInt(localStorage.getItem("savedTime"), 10) || 0; 
  const [time, setTime] = useState(new Date(savedTime));
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  function startTimer() {
    const savedTime = parseInt(localStorage.getItem("pausedTime"), 10);
  
    if (savedTime) {
      const newStartTime = new Date().getTime() - savedTime;
      setStartTime(newStartTime);
    } else {
      const newStartTime = new Date();
      setStartTime(newStartTime);
      localStorage.setItem('startTime', newStartTime);
    }
    setRunning(true);
  };

  function pauseTimer() {
    if (running) {
      setRunning(false);
      localStorage.setItem('pausedTime', time.getTime());
    }
  };

  function resetTimer() {
    setTime(new Date(0));
    setRunning(false);
    setStartTime(null);
    localStorage.setItem("savedTime", 0);
    localStorage.removeItem('startTime');
    localStorage.removeItem('pausedTime');
  };

  function formattedTime() {
    const minutes = format(time, 'mm');
    const seconds = format(time, 'ss');
    const milliseconds = format(time, 'SS');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime(new Date(new Date().getTime() - startTime));
      }, 10);
  
      // Save the current time in local storage
      localStorage.setItem("savedTime", time.getTime());
  
      return () => clearInterval(interval);
    }
  }, [running, startTime, time]);

  return (
    <div className='timer'>
      <h1>STOPWATCH</h1>
      <div className='buttons'>
        <button onClick={startTimer} disabled={running}>Start</button>
        {running ? (
          <button onClick={pauseTimer}>Pause</button>
        ) : (
          <button onClick={startTimer}>Resume</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
      <h1>{formattedTime()}</h1>
    </div>
  );
};

export default Timer;