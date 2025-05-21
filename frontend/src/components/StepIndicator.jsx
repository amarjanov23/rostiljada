const StepIndicator = ({ step, theme }) => {
  const steps = ["Dan", "Sport", "Tim"];

  return (
    <div className="flex justify-between items-center mb-10 px-2">
      {steps.map((label, i) => {
        const isCurrent = i + 1 === step;
        const isCompleted = step > i + 1;

        const circleStyle = {
          backgroundColor: isCompleted
            ? theme.stepCompleted
            : isCurrent
            ? theme.stepCurrent
            : theme.stepUpcoming ,
          color: theme.stepTextColor ,
        };

        const labelStyle = {
          color: isCurrent
            ? theme.label.color
            : "rgba(0, 0, 0, 0.4)",
          fontWeight: isCurrent ? "bold" : "normal",
        };

        return (
          <div key={label} className="flex-1 text-center">
            <div
              className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-base font-bold shadow transition-all duration-300"
              style={circleStyle}
            >
              {i + 1}
            </div>
            <div
              className="text-sm tracking-wide transition-colors duration-300"
              style={labelStyle}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
