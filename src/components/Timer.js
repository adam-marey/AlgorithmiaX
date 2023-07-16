import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(
    () => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    },
    [isActive, seconds]
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
        {seconds > 60
          ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
          : `${seconds}s`}
      </span>
      <button
        style={{
          backgroundColor: isActive ? '#f1c40f' : '#2ecc71',
          border: 'none',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}
        onClick={toggle}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button
        style={{
          backgroundColor: '#e74c3c',
          border: 'none',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
