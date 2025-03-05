import { useState, useRef } from 'react'
import ResultModal from './ResultModal';


export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  // timeRemaining < targetTime * 1000 => the timer started (is not equal)
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if(timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // setInterval: executes function every time on given interval
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  let buttonName = "";
  {
    timerIsActive ? (buttonName = "Stop") : (buttonName = "Start");
  }
  return (
    <>
      {/* ref={dialog} => connects dialog to function useImperativeHandle*/}
      <ResultModal 
        ref={dialog} 
        targetTime={targetTime} 
        remainingTime={timeRemaining}
        onReset={handleReset}
        />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {buttonName} Challenge
          </button>
        </p>
        {timerIsActive ? (
          <p className="active">Time is running...</p>
        ) : (
          <p>Timer inactive</p>
        )}
      </section>
    </>
  );
}