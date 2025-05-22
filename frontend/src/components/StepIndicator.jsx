const StepIndicator = ({ step, theme, onStepClick }) => {
  const steps = ["Dan", "Sport", "Tim"];

  return (
    <div className="flex justify-between items-center mb-10 px-2">
      {steps.map((label, i) => {
        const stepNumber = i + 1;
        const isCurrent = stepNumber === step;
        const isCompleted = step > stepNumber;

        const circleStyle = {
          backgroundColor: isCompleted
            ? theme.stepCompleted
            : isCurrent
            ? theme.stepCurrent
            : theme.stepUpcoming,
          color: theme.stepTextColor,
          cursor: stepNumber <= step ? "pointer" : "default",
        };

        const labelStyle = {
          color: isCurrent ? theme.label.color : "rgba(0, 0, 0, 0.4)",
          fontWeight: isCurrent ? "bold" : "normal",
        };

        return (
          <div key={label} className="flex-1 text-center">
            <div
              className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300"
              style={circleStyle}
              onClick={() => {
                if (stepNumber <= step) onStepClick(stepNumber);
              }}
            >
              {stepNumber}
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
