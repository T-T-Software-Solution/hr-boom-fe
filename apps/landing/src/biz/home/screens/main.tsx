"use client";

import { theme } from "@landing/theme";
import { ChatWidget } from "@tt-ss-hr/shared-ui";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ButtonTop } from "../components/buttonTop";
import { Footer } from "../components/footer";
import { MainService } from "../components/main-service";
import { NavBar } from "../components/nav-bar";
import { SearchBar } from "../components/search-bar";
import { SectionComment } from "../components/section-comment";
import { SectionEvent } from "../components/section-event";
import { SectionFaq } from "../components/section-faq";
import { SectionKnowledge } from "../components/section-knowledge";
import { SectionNews } from "../components/section-news";
import { SectionService } from "../components/section-service";
import { SectionSitemap } from "../components/section-sitemap";
import { SectionSurvey } from "../components/section-survey";
import { SectionWeblink } from "../components/section-weblink";

export const HomeMainScreen = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-black bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer outline-none border-none"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
            <img
              src="/images/today-popup.webp"
              alt="Popup announcement"
              className="max-w-[90vw] max-h-[90vh] object-contain md:max-w-[50vw] md:max-h-[50vh]"
            />
          </div>
        </div>
      )}

      <NavBar />

      <div className="w-full bg-[url('/images/home-bg.png')] bg-cover bg-center bg-no-repeat min-h-[480px] ">
        <h1 className="text-white text-3xl font-bold text-center mb-8 m-0 pt-[30px] md:pt-[60px] px-4">
          บริการภาครัฐกรุงเทพมหานคร ครบจบในที่เดียว
        </h1>

        <SearchBar />
        <MainService />
      </div>

      <SectionService />
      <SectionNews />
      <SectionEvent />
      <SectionKnowledge />
      <SectionComment />
      <SectionSurvey />
      <SectionSitemap />
      <SectionFaq />
      <SectionWeblink />
      <ButtonTop />
      <ChatWidget
        popoverPosition="left"
        buttonGradient={{
          from: theme.colors?.primary?.[5] ?? '#000',
          to: theme.colors?.primary?.[4] ?? '#fff',
          deg: 90
        }}
        chatProps={{
          scrollableShadow: true
        }}
      />
      <Footer />
    </div>
  );
};
