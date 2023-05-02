import { useEffect, useState } from "react";
import LightModeIcon from "./icons/LightModeIcon";
import DarkModeIcon from "./icons/DarkModeIcon";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeFromStorage = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(isDarkModeFromStorage);
    if (isDarkModeFromStorage) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("isDarkMode", newIsDarkMode.toString());
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button
      className="fixed right-4 top-4 rounded-full bg-slate-800 p-2 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
      onClick={toggleDarkMode}
    >
      <span>{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}</span>
    </button>
  );
};

export default DarkModeToggle;
