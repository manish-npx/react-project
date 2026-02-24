import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

function InlineEditableInput() {
  const [items, setItems] = useState([
    {
      id: 1,
      text: "Hello",
    },
    {
      id: 2,
      text: "Sangam",
    },
  ]);
  const [currentEditedID, setCurrentEditedID] = useState(null);
  const [currentEditedValue, setCurrentEditedValue] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentEditedID !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentEditedID]);

  const handleEdit = (id, text) => {
    setCurrentEditedID(id);
    setCurrentEditedValue(text);
  };

  const handleBlur = () => {
    if (currentEditedID !== null) {
      saveChanges();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveChanges();
    } else if (event.key === "Escape") {
      setCurrentEditedID(null);
    }
  };

  const saveChanges = () => {
    if (currentEditedID !== null) {
      setItems(
        items.map((item) =>
          item.id === currentEditedID
            ? { ...item, text: currentEditedValue }
            : item
        )
      );
      setCurrentEditedID(null);
    }
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Inline Editable Input</h1>
      <div className="mt-10 flex flex-col gap-4">
        {items.map((item) =>
          currentEditedID === item.id ? (
            <Input
              ref={inputRef}
              value={currentEditedValue}
              onChange={(event) => setCurrentEditedValue(event.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={"w-full"}
            />
          ) : (
            <div
              onClick={() => handleEdit(item.id, item.text)}
              className="flex p-4 bg-muted-foreground justify-between items-center cursor-pointer group"
            >
              <span className="text-white">{item.text}</span>
              <Pencil className="h-4 w-4 opacity-0 text-white group-hover:opacity-100 transition-opacity" />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default InlineEditableInput;
