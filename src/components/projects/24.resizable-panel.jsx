import { useEffect, useRef, useState } from "react";

function ResizablePanel() {
  const [leftWidth, setLeftWidth] = useState(50);

  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      const clampedWidth = Math.min(Math.max(newLeftWidth, 20), 80);

      setLeftWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Resizable Panel (Split Layout)</h1>
      <div
        className="w-full flex h-[400px] border mt-10"
        style={{ cursor: isDragging ? "col-resize" : "default" }}
        ref={containerRef}
      >
        <div
          className="bg-gray-200 p-3 overflow-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <p className="text-sm font-medium mb-2">Left Panel</p>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-sm bg-white border p-2 mb-1 rounded">
              Left Item {i + 1}
            </div>
          ))}
        </div>
        <div
          className={`w-1 bg-gray-500 hover:bg-blue-500 ${
            isDragging ? "bg-blue-400" : ""
          }`}
          onMouseDown={handleMouseDown}
        />
        <div
          className="bg-gray-200 p-3 overflow-auto"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <p className="text-sm font-medium mb-2">Right Panel</p>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-sm bg-white border p-2 mb-1 rounded">
              Right Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResizablePanel;
