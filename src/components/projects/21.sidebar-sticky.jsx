import { useEffect, useRef, useState } from "react";

function StickySidebar() {
  const [isSticky, setIsSticky] = useState(false);

  const headerRef = useRef(null);
  const sideBarRef = useRef(null);

  //effect which handle scroll event for making the sidebar sticky

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      console.log(headerBottom);

      setIsSticky(headerBottom <= 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //update the sidebar width when the window is resized

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Sticky Sidebar</h1>
      <div className="min-h-[150vh]">
        <div ref={headerRef} className="bg-blue-600 text-white p-4 mt-6">
          <h1 className="text-3xl">Site Header</h1>
        </div>
        <div className="flex">
          <div className="w-1/4 relative">
            <div
              ref={sideBarRef}
              className={`bg-gray-100 p-5 ${isSticky ? "fixed top-0" : ""}`}
              style={{ height: "calc(100vh - 20px)" }}
            >
              <h2 className="text-xl font-semibold">Sidebar</h2>
              <nav>
                <ul className="space-y-3">
                  {[
                    "Dashboard",
                    "Profile",
                    "Settings",
                    "Products",
                    "users",
                  ].map((item) => (
                    <li key={item} className="p-2 hover:bg-gray-200 rounded">
                      <a className="block" href="#">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">Main Content</h2>
            {Array.from({ length: 100 }).map((_, index) => (
              <h3 className="text-xl font-medium mb-2">Section {index + 1}</h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickySidebar;
