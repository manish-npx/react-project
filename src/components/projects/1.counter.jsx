//ur thinking process ->
//always explain while you r coding

import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Redo2, Undo2 } from "lucide-react";

function Counter() {
  const [history, setHistory] = useState([0]);
  const [position, setPosition] = useState(0);

  const currentValue = history[position];

  const addValueToHistory = (newValue) => {
    //remove if any future history if we have gone back and creating a new branch
    const newHistory = history.slice(0, position + 1);
    setHistory([...newHistory, newValue]);
    setPosition(position + 1);
  };

  const decrement = () => addValueToHistory(currentValue - 1);
  const increment = () => addValueToHistory(currentValue + 1);

  const undo = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const redo = () => {
    if (position < history.length - 1) {
      setPosition(position + 1);
    }
  };

  console.log(history, position);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Counter with Undo/Redo</h1>
      <div className="flex flex-col mt-5 justify-center gap-4">
        <div className="flex justify-center items-center">
          <div className="text-7xl font-bold tabular-nums">{currentValue}</div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button onClick={decrement}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={increment}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button
            disabled={position === 0}
            onClick={undo}
            variant={"secondary"}
          >
            Undo <Undo2 className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground">
            {position + 1} / {history.length}
          </div>
          <Button
            disabled={position === history.length - 1}
            onClick={redo}
            variant={"secondary"}
          >
            Redo <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
