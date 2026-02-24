import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { horizontalMenuItems } from "@/config";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HorizontalScrollMenu() {
  const [activeTab, setActiveTab] = useState("All");
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollContainerRef = useRef(null);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    console.log(container.scrollLeft, "container.scrollLeft");

    setShowLeftButton(container.scrollLeft > 0);

    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: 200, behavior: "smooth" });
  };

  //run scroll check on mount and on window resize
  useEffect(() => {
    checkScrollButtons();

    window.addEventListener("resize", checkScrollButtons);

    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Horizontal Scroll Menu (Youtube Style)</h1>
      <Card className="mt-5 p-4">
        <CardContent>
          <div className="relative">
            {showLeftButton && (
              <Button
                variant={"ghost"}
                size="icon"
                onClick={handleScrollLeft}
                className={
                  "absolute left-0  top-1/2 -translater-y-1/2 z-10 bg-red-500 hover:bg-red-800  backdrop-blur-sm shadpwn-md h-8 w-8"
                }
              >
                <ChevronLeft className="h-4 text-white w-4" />
              </Button>
            )}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto  py-2 px-1"
              onScroll={checkScrollButtons}
            >
              {horizontalMenuItems.map((item) => (
                <Button
                  key={item}
                  variant={"outline"}
                  className={`whitespace-nowrap rounded-full text-sm h-9 px-4 bg-muted/50 hover:bg-muted`}
                >
                  {item}
                </Button>
              ))}
            </div>
            {showRightButton && (
              <Button
                variant={"ghost"}
                size="icon"
                onClick={handleScrollRight}
                className={
                  "absolute right-0 top-1/2 -translater-y-1/2 z-10 bg-red-500 hover:bg-red-800  backdrop-blur-sm shadpwn-md h-8 w-8"
                }
              >
                <ChevronRight className="h-4 text-white w-4" />
              </Button>
            )}
            {showLeftButton && (
              <div className="absolute left-8 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            )}
            {showRightButton && (
              <div className="absolute right-8 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HorizontalScrollMenu;
