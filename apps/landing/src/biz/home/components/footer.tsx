import { useEffect, useState } from "react";
import { FaFacebookF, FaLine, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const [fontSize, setFontSize] = useState("base");

  const onSetFontSize = (size: string) => {
    setFontSize(size);
  };

  useEffect(() => {
    let size = "16px";
    if (fontSize === "base") {
      size = "16px";
    } else if (fontSize === "lg") {
      size = "20px";
    } else if (fontSize === "xl") {
      size = "24px";
    }

    // Create style for all elements
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      * {
        font-size: ${size};
        line-height: ${parseInt(size) * 1.5}px;
      }
      
      :root {
        font-size: ${size};
        line-height: ${parseInt(size) * 1.5}px;
      }
    `;

    const existingStyle = document.querySelector("style[data-custom-styles]");
    if (existingStyle) {
      existingStyle.remove();
    }

    styleSheet.setAttribute("data-custom-styles", "true");
    document.head.appendChild(styleSheet);

    return () => {
      styleSheet.remove();
    };
  }, [fontSize]);

  return (
    <footer>
      <div className="mx-auto xl:px-20 px-4 py-2 bg-[#00744B0D] bg-opacity-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-4">
          <div className="flex flex-col gap-4 items-start sm:items-center justify-start">
            <h3 className="font-bold mb-2 text-[#00744B] text-3xl m-0 mt-4">
              GOV BKK
            </h3>
            <div className="space-y-1">
              <div className="flex justify-start items-center gap-5 flex-col border border-solid border-[#0071BC80] rounded-xl cursor-pointer bg-white max-w-[90px] p-4 shadow-md">
                <img src="/icons/shared-site.svg" alt="shared-site" />
                <span className="text-[#0071BC] text-sm">แชร์เว็บไซต์</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">ที่อยู่และช่องทางติดต่อ</h3>
            <div className="space-y-1">
              <p className="font-bold text-sm">BKKGov ศูนย์บริการ:</p>
              <p className="text-sm">
                <span className="font-bold">1555</span> (ฟรี ตลอด 24 ชั่วโมง)
              </p>
              <p className="text-sm">
                <span className="font-bold">02-245-xxxx</span> (ในเวลาราชการ)
                (09:00 - 16:00 น.)
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-1">โทรต่อ:</h3>
              <ul className="space-y-1 list-none pl-0 m-0">
                <li className="text-sm">
                  <span className="font-bold">01</span> แจ้งเหตุด่วน
                  แจ้งเหตุร้าย
                </li>
                <li className="text-sm">
                  <span className="font-bold">02</span> สายด่วนน้ำท่วม
                </li>
                <li className="text-sm">
                  <span className="font-bold">03</span> เทศกิจ
                </li>
                <li className="text-sm">
                  <span className="font-bold">04</span> สอบถามข้อมูล
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">ช่องทางออนไลน์</h3>
            <ul className="space-y-2 pl-0 m-0 list-none">
              <li className="text-sm">
                <a
                  href="#"
                  className="hover:underline text-[#2D7DD8] no-underline"
                >
                  BKKGov Mobile App
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  className="hover:underline text-[#2D7DD8] no-underline"
                >
                  BKK Connect
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  className="hover:underline text-[#2D7DD8] no-underline"
                >
                  ศูนย์ข้อมูลเปิด (Open Data)
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  className="hover:underline text-[#2D7DD8] no-underline"
                >
                  บริการ API สำหรับนักพัฒนา
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 py-4">
              <a
                href="#"
                className="hover:opacity-80 flex items-center bg-[#E3E6EA] rounded-full p-2"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4 text-[#2D7DD8]" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 flex items-center bg-[#E3E6EA] rounded-full p-2"
                aria-label="Line"
              >
                <FaLine className="w-4 h-4 text-[#4CAF50]" />
              </a>
              <a
                href="#"
                className="hover:opacity-80 flex items-center bg-[#E3E6EA] rounded-full p-2"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">สถิติ</h3>
            <div className="space-y-2">
              <p className="text-sm m-0">
                จำนวนผู้เข้าชม {new Intl.NumberFormat("th-TH").format(3738967)}
              </p>
              <h4 className="font-bold mt-4">เข้าสู่ระบบ</h4>
              <ul className="list-none pl-0 m-0 space-y-1">
                <li className="text-sm">
                  <a href="#" className="no-underline text-black text-sm">
                    สำหรับเจ้าหน้าที่
                  </a>
                </li>
                <li className="text-sm">
                  <a href="#" className="no-underline text-black text-sm">
                    บุคคลทั่วไป
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 bg-[#006B3E] text-white">
        <div className="mx-auto xl:px-20 px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              Copyright © GOV BKK. All Rights Reserved.
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="hover:opacity-80 flex items-center"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 flex items-center"
                  aria-label="Facebook"
                >
                  <FaXTwitter className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 flex items-center"
                  aria-label="Facebook"
                >
                  <FaLine className="w-4 h-4 text-white" />
                </a>
              </div>
              <div className="w-[0px] min-h-[20px] border border-white border-solid outline-none"></div>
              <div className="flex items-center gap-2">
                <span>ขนาดตัวอักษร</span>
                <span
                  className={`text-base cursor-pointer ${
                    fontSize === "base" ? "underline" : ""
                  }`}
                  onClick={() => onSetFontSize("base")}
                >
                  ก
                </span>
                <span
                  className={`text-lg cursor-pointer ${
                    fontSize === "lg" ? "underline" : ""
                  }`}
                  onClick={() => onSetFontSize("lg")}
                >
                  ก
                </span>
                <span
                  className={`text-xl cursor-pointer ${
                    fontSize === "xl" ? "underline" : ""
                  }`}
                  onClick={() => onSetFontSize("xl")}
                >
                  ก
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
