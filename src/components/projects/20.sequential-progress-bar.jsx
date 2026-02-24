import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

function SequentialProgressBar() {
  const BAR_COUNT = 4;
  const [progressValues, setProgressvalues] = useState(
    Array(BAR_COUNT).fill(0)
  );

  const [activeBarIndex, setActiveBarIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartSequence = () => {
    setProgressvalues(Array(BAR_COUNT).fill(0));
    setActiveBarIndex(0);
    setIsRunning(true);
  };

  const handleResetSequence = () => {
    setIsRunning(false);
    setActiveBarIndex(null);
    setProgressvalues(Array(BAR_COUNT).fill(0));
  };

  const getCurrentBarStatus = (getCurrentIndex) => {
    if (activeBarIndex === null) return "Pending";
    if (getCurrentIndex < activeBarIndex) return "Completed";
    if (getCurrentIndex === activeBarIndex) return "In Progress";

    return "Pending";
  };

  useEffect(() => {
    if (!isRunning || activeBarIndex === null || activeBarIndex >= BAR_COUNT)
      return;

    const currentProgress = progressValues[activeBarIndex];

    if (currentProgress >= 100) {
      if (activeBarIndex < BAR_COUNT - 1) {
        setActiveBarIndex(activeBarIndex + 1);
      } else {
        setIsRunning(false);
        setActiveBarIndex(null);
      }

      return;
    }

    const timer = setTimeout(() => {
      const newProgressValues = [...progressValues];
      newProgressValues[activeBarIndex] = Math.min(currentProgress + 5, 100);
      setProgressvalues(newProgressValues);
    }, 100);

    return () => clearTimeout(timer);
  }, [isRunning, activeBarIndex, progressValues]);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Sequential Progress Bar</h1>
      <div className="mt-5 space-y-8 p-4">
        {progressValues.map((progressItem, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold">Step {index + 1}</span>
              <span
                className={
                  activeBarIndex === index
                    ? "text-blue-500 font-medium"
                    : index < (activeBarIndex || 0)
                    ? "text-green-500"
                    : "text-muted-foreground"
                }
              >
                {getCurrentBarStatus(index)}
              </span>
            </div>
            <Progress
              value={progressItem}
              className={`h-2 ${activeBarIndex === index ? "bg-blue-100" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={handleResetSequence}>Reset</Button>
        <Button onClick={handleStartSequence} disabled={isRunning}>
          Start Sequence
        </Button>
      </div>
    </div>
  );
}

export default SequentialProgressBar;
