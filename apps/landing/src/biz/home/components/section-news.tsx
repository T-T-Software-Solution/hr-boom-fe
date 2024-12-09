import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { IoGrid } from "react-icons/io5";
import { useState } from "react";

export const SectionNews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/news1.jpg",
      date: { day: "20", month: "ก.ค" },
      title:
        "ชวนค้นหาอาชีพที่ใช่ ในงาน Good Skills, Great Jobs 24 – 26 กรกฎาคม นี้ ที่ศาลาว่าการ กทม. ดินแดง",
    },
    {
      image: "/images/news2.jpg",
      date: { day: "22", month: "ก.ค" },
      title:
        "กทม.จัดกิจกรรมส่งเสริมการท่องเที่ยวย่านเก่า ณ ชุมชนเก่าแก่ย่านคลองสาน",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const newsList = [
    "ผู้ว่าฯ ชัชชาติ ต้อนรับทูตอียิปต์ หารือความร่วมมือด้านบริหารจัดการเมือง พร้อมผลักดันเที่ยวบินตรงส่งเสริมการท่องเที่ยวกรุงเทพฯ",
    "เตรียมจัดงานเทศกาลตรุษจีนเยาวราช 2567 วันที่...",
    "กทม.เปิดลงทะเบียนบัตรสวัสดิการรอบใหม...",
    `เชิญชวนร่วมกิจกรรม "กรุงเทพฯ เมืองสร้าง...`,
    `เปิดให้บริการรถไฟฟ้าสายสีชมพู ส่วนต่อขยาย`,
    `รณรงค์ลดใช้ถุงพลาสติก ในตลาดสด 50 แห่ง`,
    `เตรียมจัดงานเทศกาลตรุษจีนเยาวราช 2567 วันที่...`,
  ];
  return (
    <div className="bg-[#F0F2F2] w-full" id="news">
      <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
        <h2 className="text-4xl font-bold text-center mb-8">
          ข่าวสารและกิจกรรมกรุงเทพมหานคร
        </h2>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <IoGrid className="text-[#9FA5A6] w-5 h-5" />
            <span>ข่าวสารทั้งหมด</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex items-center gap-2 w-full justify-center">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full outline-none flex items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer"
            >
              <FaChevronLeft className="text-[#00744B]" />
            </button>
            <div className="relative ">
              <div className="relative min-h-[350px] rounded-lg overflow-hidden bg-white p-6">
                <img
                  src={slides[currentSlide].image}
                  alt={`News slideshow ${currentSlide + 1}`}
                  className="w-full h-full object-cover max-h-[350px] lg:max-h-[250px] rounded-md"
                />
                <div className="bg-[#00744B] text-sm w-fit px-4 py-1 rounded-md mb-2 text-white flex flex-col items-center absolute top-7 left-7">
                  <div>{slides[currentSlide].date.day}</div>
                  <div className="text-sm">
                    {slides[currentSlide].date.month}
                  </div>
                </div>
                <div className="">
                  <p className="text-sm font-semibold">
                    {slides[currentSlide].title}
                  </p>
                  <a
                    href="#"
                    className="text-[#0063D5] text-xs font-semibold flex items-center gap-1 no-underline"
                  >
                    อ่านต่อ{" "}
                    <FaArrowRight className="text-[#0063D5] text-[10px]" />
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="bg-white rounded-full outline-none flex items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer"
            >
              <FaChevronRight className="text-[#00744B]" />
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 md:py-7 md:px-6 border-solid shadow-md bg-white ">
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-2 justify-center bg-[#00744B] text-white rounded-l-lg px-4 py-2">
                <GrAnnounce className="text-white min-w-5 min-h-5" />
                <div className="text-white font-semibold">ประกาศ</div>
              </div>
              <div className="text-[#00744B] font-semibold max-w-full overflow-hidden whitespace-nowrap text-ellipsis bg-[#F2F7FD] py-2">
                ผู้ว่าฯ ชัชชาติ ต้อนรับทูตอียิปต์ หารือความ
                ร่วมมือด้านบริหารจัดการเมือง พร้อมผลักดัน
                เที่ยวบินตรงส่งเสริมการท่องเที่ยวกรุงเทพฯ
              </div>
            </div>
            <div className="space-y-4">
              {newsList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <GrAnnounce className="text-[#00744B] min-w-5 min-h-5" />
                  <p className="text-sm m-0">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
