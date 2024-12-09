import { useState } from "react";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLongArrowAltRight,
} from "react-icons/fa";

export const SectionKnowledge = () => {
  const [, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/knowledge3.jpg",
      title: `ซีรีย์ชุด “ร้อยใจภักดิ์ รักษ์กรุงเทพฯ” ตอน“จรรโลงใจ…อยู่ในความร่มเย็น”`,
    },
    {
      image: "/images/knowledge2.jpg",
      title: `กรุงเทพมหานคร โปร่งใส ไร้การทุจริต`,
    },
    {
      image: "/images/knowledge1.jpg",
      title: `กทม. ตั้งใจดี I EP.5 BKK Food Bank`,
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        นวัตกรรม และคลังความรู้
      </h2>
      <div className="flex items-center gap-2 w-full justify-center">
        <button
          className="bg-white rounded-full outline-none items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer hidden xl:flex"
          onClick={handlePrev}
        >
          <FaChevronLeft className="text-[#00744B]" />
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-center">
          {slides.slice(0, 3).map((slide, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-md bg-white p-6 border border-gray-200 border-solid min-h-[300px] h-fit ${
                index === 1 ? "xl:col-span-2" : ""
              }`}
            >
              <div
                className={`relative rounded-lg overflow-hidden ${
                  index === 1 ? "min-h-[250px]" : "min-h-[150px]"
                }`}
              >
                <img
                  src={slide.image}
                  alt={`News slideshow ${index + 1}`}
                  className={`w-full h-full object-cover  object-center rounded-md ${
                    index === 1
                      ? "max-h-[250px] min-h-[150px]"
                      : "max-h-[250px] min-h-[150px]"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{slide.title}</h3>
                <a
                  href="#"
                  className="text-[#0063D5] text-xs font-semibold flex items-center gap-1 no-underline"
                >
                  อ่านต่อ{" "}
                  <FaArrowRight className="text-[#0063D5] text-[10px]" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-white rounded-full outline-none items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer hidden xl:flex"
          onClick={handleNext}
        >
          <FaChevronRight className="text-[#00744B]" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 py-6">
        <button className="cursor-pointer bg-[#00744B] text-sm font-semibold text-white px-4 md:px-6 py-2 rounded-full outline-none hover:bg-[#00744B]/80 transition-colors duration-300 border-none flex items-center gap-2">
          ดูทั้งหมด
          <FaLongArrowAltRight className="text-white" />
        </button>
      </div>
    </div>
  );
};
