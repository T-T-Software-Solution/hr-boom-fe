import { useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

export const SectionEvent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mainImage, setMainImage] = useState("/images/event1.jpg");

  const slides = [
    {
      image: "/images/event1.jpg",
      date: { day: "19", month: "ก.ค" },
      title: "กทม. ร่วมกิจกรรมจิตอาสาพระราชทาน “วันพ่อแห่งชาติ”",
      description: `(4 ธ.ค. 67) นายศุภกฤต บุญขันธ์ รองปลัดกรุงเทพมหานคร ร่วมกิจกรรมเนื่องในวันคล้ายวันพระบรมราชสมภพพระบาทสมเด็จพระบรมชนกาธิเบศรมหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร “วันพ่อแห่งชาติ” ณ บ้านมนังคศิลา เขตดุสิต เนื่องในวันที่ 5 ธันวาคม 2567 เป็นวันคล้ายวันพระบรมราชสมภพพระบาทสมเด็จ ...`,
      images: ["/images/event1.jpg", "/images/event2.jpg","/images/event3.jpg","/images/event4.jpg"],
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="bg-[#F0F2F2] w-full">
      <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
        <h2 className="text-4xl font-bold text-center mb-8">รูปภาพกิจกรรม</h2>
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <IoGrid className="text-[#9FA5A6] w-5 h-5" />
            <span>ดูรูปภาพกิจกรรมทั้งหมด</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full outline-none  items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer z-10 absolute md:static flex left-0"
            >
              <FaChevronLeft className="text-[#00744B]" />
            </button>
            <div className="relative flex items-start md:flex-row flex-col bg-white p-6 gap-10">
              <div className="relative min-h-[350px] rounded-lg overflow-hidden md:w-1/2 ">
                <img
                  src={mainImage}
                  alt={`News slideshow ${currentSlide + 1}`}
                  className="w-full h-full object-cover max-h-[550px] lg:max-h-[450px] rounded-md overflow-hidden"
                />
                <div className="bg-[#00744B] text-sm w-fit px-4 py-1 rounded-md mb-2 text-white flex flex-col items-center absolute top-5 left-5">
                  <div>{slides[currentSlide].date.day}</div>
                  <div className="text-sm">
                    {slides[currentSlide].date.month}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {slides[currentSlide].images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event image ${index + 1}`}
                      className={`w-20 h-20 object-cover object-center cursor-pointer rounded-md ${mainImage === image ? "border-3 border-solid border-[#00744B]" : ""}`}
                      onClick={() => setMainImage(image)}
                    />
                  ))}
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="text-sm font-semibold text-white rounded-full bg-[#3D4B5B] px-4 py-1 w-fit">
                  กิจกรรม
                </div>
                <p className="text-lg font-semibold">
                  {slides[currentSlide].title}
                </p>
                <p className="font-normal">
                  {slides[currentSlide].description}
                </p>
                <a
                  href="#"
                  className="text-[#00744B] flex items-center gap-1 no-underline border border-solid border-[#00744B] w-fit px-4 py-2 rounded-md"
                >
                  อ่านต่อ
                  <FaArrowRight className="text-[#00744B] text-sm" />
                </a>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="bg-white rounded-full outline-none items-center justify-center w-10 h-10 shadow-md border border-gray-200 border-solid min-w-10 cursor-pointer z-10 absolute md:static flex right-0"
            >
              <FaChevronRight className="text-[#00744B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
