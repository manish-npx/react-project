import { useState } from "react";

function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: ["Todo 1", "Todo 2"],
    inProgress: ["progress"],
    done: ["Completed"],
  });

  const [dragging, setdragging] = useState(null);

  const onDragStart = (currentTask, currentColumnId) => {
    setdragging({ currentTask, currentColumnId });
  };

  const onDrop = (target) => {
    if (!target) return;

    if (dragging.currentColumnId === target) return;

    setColumns((prev) => {
      const sourceItems = prev[dragging.currentColumnId].filter(
        (item) => item !== dragging.currentTask
      );
      const targetItems = [...prev[target], dragging.currentTask];

      return {
        ...prev,
        [dragging.currentColumnId]: sourceItems,
        [target]: targetItems,
      };
    });
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Kanban Board</h1>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <div
            key={columnId}
            className="rounded-md border p-2"
            onDragOver={onDragOver}
            onDrop={() => onDrop(columnId)}
          >
            <h3 className="font-bold capitalize mb-2">{columnId}</h3>

            {tasks.map((task) => (
              <div
                key={task}
                className="bg-gray-200 p-2 mb-2 rounded cursor-move"
                draggable
                onDragStart={() => onDragStart(task, columnId)}
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
