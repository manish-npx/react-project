import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

function ClickOutsideDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log(event.target, dropdownRef.current);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Close Dropdown On Outside Click</h1>
      <div className="relative mt-6" ref={dropdownRef}>
        <Button
          onClick={toggleDropdown}
          variant={"outline"}
          className={"w-full justify-between"}
        >
          Select an option
          <ChevronDown
            className={`ml-2 h-4 w-4 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
        {isOpen && (
          <div className="absolute mt-2 w-full rounded-md border bg-background z-10 shadow-lg">
            <div className="py-1">
              {["Option 1", "Option 2", "Option 3"].map((option, index) => (
                <button
                  key={index}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClickOutsideDropdown;
