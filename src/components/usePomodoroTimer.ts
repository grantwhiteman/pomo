import { useReducer, useEffect, useRef } from "react";

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
}

const initialState: TimerState = { timeLeft: 25 * 60, isRunning: false };

type TimerAction =
  | { type: "TICK" }
  | { type: "START" }
  | { type: "STOP" }
  | { type: "RESET" };

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "TICK":
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };
    case "START":
      return { ...state, isRunning: true };
    case "STOP":
      return { ...state, isRunning: false };
    case "RESET":
      return initialState;
    default:
      throw new Error();
  }
}

export const usePomodoroTimer = (initialTime: number) => {
  initialState.timeLeft = initialTime;
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerWorker = useRef<Worker>();

  useEffect(() => {
    timerWorker.current = new Worker(
      new URL("./timer.worker.js", import.meta.url)
    );
    timerWorker.current.onmessage = (event) => {
      if (event.data.action === "tick") {
        dispatch({ type: "TICK" });
      }
    };
    return () => {
      timerWorker.current?.terminate();
    };
  }, []);

  useEffect(() => {
    document.title = `Time Left: ${formatTime(state.timeLeft)}`;
    return () => {
      document.title = "Pomodoro Timer";
    };
  }, [state.timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    timerWorker.current?.postMessage({ action: "start", delay: 1000 });
    dispatch({ type: "START" });
  };

  const stopTimer = () => {
    timerWorker.current?.postMessage({ action: "stop" });
    dispatch({ type: "STOP" });
  };

  const resetTimer = () => {
    stopTimer();
    dispatch({ type: "RESET" });
  };

  return { ...state, startTimer, stopTimer, resetTimer, formatTime };
};
