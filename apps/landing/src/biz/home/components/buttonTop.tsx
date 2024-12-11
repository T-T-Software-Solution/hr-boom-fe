import { FaChevronUp } from "react-icons/fa";

export const ButtonTop = () => {
  const scrollToTop = () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className="fixed bottom-16 right-5 flex items-center gap-2 flex-col cursor-pointer pb-4"
      onClick={() => scrollToTop()}
    >
      <button
        className=" bg-black p-3 rounded-full shadow-lg transition-all duration-300 outline-none border border-gray-200 border-solid flex items-center justify-center cursor-pointer"
        aria-label="Go to top"
      >
        <FaChevronUp className="text-white" />
      </button>
      {/* <span className="font-bold text-xs">Go to top</span> */}
    </div>
  );
};
