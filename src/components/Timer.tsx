import { useState, useRef, useEffect } from "react";
import styles from './Timer.module.css'

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout>();

  const tick = () => {
    setSeconds((seconds) => {
      return seconds + 1;
    });
  }

  useEffect(() => {
    timerRef.current = setInterval(() => tick(), 1000);
 
    return () => {
      clearInterval(timerRef.current)
    };
  }, [])

  const correctValueFormat = (value: number) => {
    return value < 10 ? '0' + value : value
  }

  const transformTime = () => {
    const formattedHours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60))
    const formattedMinutes = Math.floor((seconds % (60 * 60)) / 60)
    const formattedSeconds = Math.floor((seconds % 60))

    return {
      formattedHours: correctValueFormat(formattedHours),
      formattedMinutes: correctValueFormat(formattedMinutes),
      formattedSeconds: correctValueFormat(formattedSeconds)
    }
  }

  const { formattedHours, formattedMinutes, formattedSeconds } = transformTime();

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        {formattedHours} : {formattedMinutes} : {formattedSeconds}
      </div>
    </div>
  )
}

export default Timer;