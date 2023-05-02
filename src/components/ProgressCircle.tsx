interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle = ({ progress }: ProgressCircleProps) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);

  return (
    <svg className="h-60 text-green-500" viewBox="0 0 120 120">
      <circle
        className="stroke-current opacity-20"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className="stroke-current stroke-2 transition-all duration-1000 ease-linear"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
    </svg>
  );
};

export default ProgressCircle;
