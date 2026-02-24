import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function KeyboardModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Keyboard Modal</h1>
      <div className="mt-5">
        <Button onClick={() => setOpen(true)}>Open Modal</Button>

        {open && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" />

            <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md bg-white rounded shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
              <h3>Modal Title</h3>
              <p>Modal Body</p>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button>Confirm</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default KeyboardModal;
