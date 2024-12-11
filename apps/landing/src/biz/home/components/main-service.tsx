import { CiWallet } from "react-icons/ci";
import { FiCreditCard } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";
import { MdElderly } from "react-icons/md";

export const MainService = () => {
  const services = [
    {
      title: "ทำบัตรประชาชน",
      description: "เอกสารสำคัญที่ต้องเตรียม, จุดทำบัตรประชาชนในกรุงเทพฯ",
      icon: <FiCreditCard className="text-[#00744B] " />,
    },
    {
      title: "ชำระภาษี/ค่าธรรมเนียม",
      description:
        "ชำระภาษีที่ดินและสิ่งปลูกสร้าง, จุดรับชำระภาษีที่ดินในกรุงเทพฯ",
      icon: <CiWallet className="text-[#00744B] " />,
    },
    {
      title: "ขออนุญาตก่อสร้าง",
      description: "เอกสารสำคัญที่ต้องเตรียม, จุดทำบัตรประชาชนในกรุงเทพฯ",
      icon: <CiWallet className="text-[#00744B] " />,
    },
    {
      title: "แจ้งเหตุฉุกเฉิน/ร้องเรียน",
      description: "เอกสารสำคัญที่ต้องเตรียม, จุดทำบัตรประชาชนในกรุงเทพฯ",
      icon: <IoIosWarning className="text-[#00744B] " />,
    },
    {
      title: "ลงทะเบียนสวัสดิการผู้สูงอายุ",
      description: "วิธีลงทะเบียนรับเบี้ยยังชีพผู้สูงอายุ",
      icon: <MdElderly className="text-[#00744B] " />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto max-w-7xl lg:px-20 px-4">
      {services.map((service) => (
        <div key={service.title} className="bg-white p-4 rounded-lg shadow-lg">
          {service.icon}
          <h3 className="mt-2 text-[#00744B] font-bold">{service.title}</h3>
          <p className=" text-gray-500 mt-1">{service.description}</p>
        </div>
      ))}
    </div>
  );
};
