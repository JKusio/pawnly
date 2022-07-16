import { useEffect, useState } from 'react';
import { CountdownProps } from './props';

const Countdown = ({ length, callback }: CountdownProps) => {
  const [seconds, setSeconds] = useState(length);
  const now = new Date().getTime();

  useEffect(() => {
    const newSecondsTimeout = setInterval(() => {
      const difference = new Date().getTime() - now;

      const newSeconds = seconds - difference / 1000;
      setSeconds(() => (newSeconds <= 0 ? 0 : newSeconds));

      if (newSeconds <= 0) {
        clearInterval(newSecondsTimeout);

        if (callback) {
          callback();
        }
      }
    }, 250);

    return () => {
      clearInterval(newSecondsTimeout);
    };
  }, []);

  return <>{Math.round(seconds)}</>;
};

export default Countdown;
