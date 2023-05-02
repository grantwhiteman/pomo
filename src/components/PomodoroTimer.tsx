import ProgressCircle from "./ProgressCircle";
import { usePomodoroTimer } from "./usePomodoroTimer";
import DarkModeToggle from "./DarkModeToggleDropdown";

interface PomodoroTimerProps {
  initialTime: number;
}

const PomodoroTimer = ({ initialTime }: PomodoroTimerProps) => {
  const { timeLeft, isRunning, startTimer, stopTimer, resetTimer, formatTime } =
    usePomodoroTimer(initialTime);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:bg-gradient-to-r dark:from-blue-800 dark:via-slate-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-700 p-10 rounded-xl shadow-md">
        <DarkModeToggle />
        <div>
          <h2 className="pb-14 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Pomodoro Timer
          </h2>
          <div className="flex justify-center items-center">
            <div className="relative">
              <ProgressCircle progress={timeLeft / initialTime} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-5xl text-gray-600 dark:text-gray-300">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={isRunning ? stopTimer : startTimer}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
