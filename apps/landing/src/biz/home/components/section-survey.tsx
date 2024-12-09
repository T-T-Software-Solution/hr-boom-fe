import { ReactNode } from "react";
import { FaArrowRightLong, FaRegMap, FaTrainSubway } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { LuCompass } from "react-icons/lu";

export const SectionSurvey = () => {
  return (
    <section className="bg-[#00744B0D] bg-opacity-5 w-full">
      <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              กรุงเทพฯ เมืองแห่งโอกาส พร้อมให้คุณสำรวจ
            </h2>

            <div className="space-y-1 md:space-y-6">
              <LinkCard
                icon={<FaTrainSubway className="text-[#00744B]" />}
                title="การเดินทาง/ขนส่ง ในกรุงเทพฯ"
                href="#"
              />
              <LinkCard
                icon={<FaRegMap className="text-[#00744B]" />}
                title="แผนที่กรุงเทพฯ"
                href="#"
              />
              <LinkCard
                icon={<LuCompass className="text-[#00744B]" />}
                title="การท่องเที่ยวกรุงเทพฯ"
                href="#"
              />
              <LinkCard
                icon={<HiOutlineEmojiHappy className="text-[#00744B]" />}
                title="สำรวจชีวิตในกรุงเทพฯ"
                href="#"
              />
            </div>
          </div>
          <div className="">
            <img
              src="/images/survey.webp"
              alt="People exploring Bangkok"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface LinkCardProps {
  icon: ReactNode;
  title: string;
  href: string;
}

const LinkCard = ({ icon, title, href }: LinkCardProps) => (
  <a
    href={href}
    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors no-underline text-black gap-2"
  >
    {icon}
    <span className="text-lg">{title}</span>
    <span className="ml-4 flex items-center">
      <FaArrowRightLong className="text-[#9FA5A6]" />
    </span>
  </a>
);
