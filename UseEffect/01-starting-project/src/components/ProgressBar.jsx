import { useState, useEffect } from "react";

export default function ProgressBar({timer}) {
    const [remainingTime, setRemainingTime] = useState(timer);
    useEffect(() => {
    const interval = setInterval(() => {
        // executed every 10 ms
        setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
        clearInterval(interval);
    };
    }, []); 


    return <progress value={remainingTime} max={timer} />;
      
}