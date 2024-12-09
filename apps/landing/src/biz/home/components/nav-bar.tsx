import { NavLink } from "react-router-dom";
import { AspectRatio } from "@mantine/core";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

export const NavBar = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [language, setLanguage] = useState("th");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <nav className="text-white bg-[#379378] border-none">
      <div className="mx-auto xl:px-20 px-4 py-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 justify-between lg:w-full min-w-fit">
            <div>
              <NavLink
                to="/"
                className="text-2xl font-bold text-white no-underline"
              >
                GOV BKK
              </NavLink>
            </div>
            <div className="hidden lg:flex space-x-6 gap-5">
              <NavLink
                to="#main-service"
                onClick={(e) => handleSmoothScroll(e, '#main-service')}
                className="hover:text-gray-200 text-white no-underline text-lg font-bold flex items-center gap-2"
              >
                {language === "th" ? "บริการประชาชน" : "Public Service"} <FaAngleDown />
              </NavLink>
              <NavLink
                to="#news"
                onClick={(e) => handleSmoothScroll(e, '#news')}
                className="hover:text-gray-200 text-white no-underline text-lg font-bold flex items-center gap-2"
              >
                {language === "th" ? "ข่าวสาร" : "News"} <FaAngleDown />
              </NavLink>
              <NavLink
                to="#"
                className="hover:text-gray-200 text-white no-underline text-lg font-bold"
              >
                {language === "th" ? "ติดต่อเรา" : "Contact Us"}
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full justify-end">
            <NavLink
              to="#"
              className="px-4 py-2 rounded-full text-white no-underline font-bold hidden sm:block text-sm md:text-base"
            >
              {language === "th" ? "สมัครสมาชิก" : "Register"}
            </NavLink>
            <NavLink
              to="#"
              className="py-2 rounded-full text-white no-underline bg-white bg-opacity-30 px-6 font-bold text-sm md:text-base"
            >
              {language === "th" ? "เข้าสู่ระบบ" : "Login"}
            </NavLink>
            <NavLink
              to="#"
              className="py-2 rounded-full text-white no-underline bg-white bg-opacity-30 px-6 items-center gap-2 text-xl font-bold hidden sm:flex relative"
              onClick={(e) => {
                e.preventDefault();
                setShowLanguageDropdown(!showLanguageDropdown);
              }}
            >
              <AspectRatio ratio={1} className="flex items-center">
                <img
                  src={`/images/${language === 'th' ? 'thailand.png' : 'united-kingdom.png'}`}
                  alt={language.toUpperCase()}
                  className="w-full object-cover h-[18px]"
                />
              </AspectRatio>
              <div className="hidden md:block font-bold">{language.toUpperCase()}</div>
              <FaAngleDown />
              
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => handleLanguageChange('th')}
                    className="flex items-center gap-2 px-6 py-2 w-full text-gray-700 hover:bg-gray-100 border-none outline-none"
                  >
                    <img src="/images/thailand.png" alt="TH" className="w-[18px]" />
                    <span>TH</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="flex items-center gap-2 px-6 py-2 w-full text-gray-700 hover:bg-gray-100 border-none outline-none"
                  >
                    <img src="/images/united-kingdom.png" alt="EN" className="w-[20px] h-[20px]" />
                    <span>EN</span>
                  </button>
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
