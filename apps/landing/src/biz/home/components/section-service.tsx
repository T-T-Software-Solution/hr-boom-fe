import { ReactNode } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { IoBookmarkOutline, IoGrid } from "react-icons/io5";
import { LiaCarSideSolid } from "react-icons/lia";
import { LuFilePlus, LuFileText } from "react-icons/lu";
import { RiTempHotFill, RiWallet3Line } from "react-icons/ri";

export const SectionService = () => {
  return (
    <div
      className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6 bg-white"
      id="main-service"
    >
      <h2 className="text-4xl font-bold text-center mb-8">บริการประชาชน</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="">
          <h3 className="text-2xl font-semibold mb-4">บริการด่วน</h3>
          <div className="space-y-3">
            <SidebarLink
              icon={<IoMdCard className="text-[#00744B] w-5 h-5" />}
              text="ทำบัตรประชาชน / พาสปอร์ต"
            />
            <SidebarLink
              icon={<RiWallet3Line className="text-[#00744B] w-5 h-5" />}
              text="ชำระค่าน้ำ/ค่าธรรมเนียม"
            />
            <SidebarLink
              icon={<AiOutlineHome className="text-[#00744B] w-5 h-5" />}
              text="ของอนุญาตก่อสร้าง"
            />
            <SidebarLink
              icon={<AiOutlineWarning className="text-[#00744B] w-5 h-5" />}
              text="แจ้งเหตุฉุกเฉิน/ร้องเรียน"
            />
            <SidebarLink
              icon={<IoBookmarkOutline className="text-[#00744B] w-5 h-5" />}
              text="จองคิวบริการ"
            />
            <SidebarLink
              icon={<LuFilePlus className="text-[#00744B] w-5 h-5" />}
              text="ลงทะเบียนสวัสดิการ"
            />
            <SidebarLink
              icon={<LuFileText className="text-[#00744B] w-5 h-5" />}
              text="ขอใบอนุญาตประกอบการ"
            />
            <SidebarLink
              icon={<RiTempHotFill className="text-[#00744B] w-5 h-5" />}
              text="บริการขยะ/สิ่งแวดล้อม"
            />
            <SidebarLink
              icon={<LiaCarSideSolid className="text-[#00744B] w-5 h-5" />}
              text="ทะเบียนรถ/ที่จอด"
            />
            <SidebarLink
              icon={<BsGraphUp className="text-[#00744B] w-5 h-5" />}
              text="จดทะเบียนธุรกิจ/พาณิชย์"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold mb-4">บริการตามหมวดหมู่</h3>
              <div className="flex items-center gap-2">
                <IoGrid className="text-[#9FA5A6] w-5 h-5" />
                <span>บริการทั้งหมด</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCategoryCard
                icon="/icons/id-card.svg"
                alt="ทะเบียน"
                title="ทะเบียนราษฎร์และบัตรประชาชน"
                description="บริการด้านเอกสารสำคัญประจำตัว เช่น ทำบัตรประชาชน, แจ้งเกิด, แจ้งย้ายที่อยู่"
                serviceCount="50"
                iconSize="w-20 h-20"
                iconBgColor="bg-[#C1C9D626] rounded-full"
              />
              <ServiceCategoryCard
                icon="/icons/graduate.svg"
                alt="การศึกษา"
                title="การศึกษาและพัฒนาเยาวชน"
                description="บริการด้านการเรียนรู้และกิจกรรมเยาวชน เช่น สมัครเรียน, ทุนการศึกษา, ศูนย์เยาวชน"
                serviceCount="10"
                iconSize="w-20 h-20"
                iconBgColor="bg-[#C1C9D626] rounded-full"
              />
              <ServiceCategoryCard
                icon="/icons/hospital-bed.svg"
                alt="สาธารณสุข"
                title="สาธารณสุขและการรักษาพยาบาล"
                description="บริการด้านสุขภาพและการแพทย์ เช่น ตรวจสุขภาพ, ฉีดวัคซีน, บริการฉุกเฉิน"
                serviceCount="1,324"
                iconSize="w-20 h-20"
                iconBgColor="bg-[#C1C9D626] rounded-full"
              />
            </div>
          </div>

          <div className="py-7 px-10 rounded-lg shadow-md border border-[#E3E6EA] border-solid">
            <h3 className="text-2xl font-semibold mt-0">บริการแนะนำ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ServiceButton
                icon="/icons/popularity.svg"
                text="คู่มือประชาชน"
                bgColor="bg-[#17AFA9]"
              />
              <ServiceButton
                icon="/icons/job-seeker.svg"
                text="กฏหมายและระเบียบที่เกี่ยวข้อง"
                bgColor="bg-[#4CAF50]"
              />
              <ServiceButton
                icon="/icons/map-trifold.svg"
                text="ข้อมูลภูมิศาสตร์สารสนเทศ (GIS)"
                bgColor="bg-[#E7973C]"
              />
              <ServiceButton
                icon="/icons/loan.svg"
                text="ใบอนุญาตและทะเบียนพาณิชย์"
                bgColor="bg-[#3A95D1]"
              />
              <ServiceButton
                icon="/icons/tax.svg"
                text="ตรวจสอบภาษี"
                bgColor="bg-[#8E44AD]"
              />
              <ServiceButton
                icon="/icons/work-outline.svg"
                text="สวัสดิการแรงงาน"
                bgColor="bg-[#C00148]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SidebarLink = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <a
    href="#"
    className="flex items-center space-x-3 py-3 px-3 hover:bg-gray-50 rounded-lg text-black no-underline bg-[#F6F6F6] border border-[#E3E6EA] border-solid"
  >
    {icon}
    <span className="text-base">{text}</span>
    <span className="ml-auto flex items-center">
      <FaArrowRightLong className="text-[#9FA5A6]" />
    </span>
  </a>
);

const ServiceButton = ({
  icon,
  text,
  bgColor,
}: {
  icon: string;
  text: string;
  bgColor: string;
}) => (
  <div className="flex items-center justify-start gap-4">
    <div
      className={`${bgColor} p-4 rounded-md text-white flex flex-col items-center justify-center text-center border-none outline-none`}
    >
      <img src={icon} alt="" className="w-8 h-8" />
    </div>
    <span className="text-lg font-medium">{text}</span>
  </div>
);

const ServiceCategoryCard = ({
  icon,
  alt,
  title,
  description,
  serviceCount,
  iconBgColor = "transparent",
  iconSize = "w-20 h-20",
}: {
  icon: string;
  alt: string;
  title: string;
  description: string;
  serviceCount: string;
  iconBgColor?: string;
  iconSize?: string;
}) => (
  <div className="bg-white p-6 rounded-lg border border-[#E3E6EA] border-solid shadow-md relative">
    <div className="flex items-center justify-center mb-4">
      <div className={`${iconBgColor} p-3 flex items-center`}>
        <img src={icon} alt={alt} className={`${iconSize} mx-auto`} />
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
    <div className="text-white text-center absolute -left-2 top-2 bg-gradient-to-r from-[#00744B] to-[#6DD2CF] rounded-lg py-2 px-4 text-sm">
      {serviceCount} บริการ
    </div>
  </div>
);
