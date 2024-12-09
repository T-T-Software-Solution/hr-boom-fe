import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegQuestionCircle,
} from "react-icons/fa";

export const SectionFaq = () => {
  const [toggles, setToggles] = useState<number[]>([0]);
  const faqs = [
    {
      question: "ฉันจะต่ออายุบัตรประชาชนได้ที่ไหนและต้องเตรียมเอกสารอะไรบ้าง?",
      answer:
        "ท่านสามารถต่ออายุบัตรประชาชนได้ที่สำนักงานเขตทุกแห่งในกรุงเทพมหานคร โดยไม่จำเป็นต้องเป็นเขตที่ท่านมีชื่ออยู่ในทะเบียนบ้าน เอกสารที่ต้องเตรียม ได้แก่:\n\t• บัตรประจำตัวประชาชนฉบับที่หมดอายุ\n\t• สำเนาทะเบียนบ้าน (ถ้ามี)",
    },
    {
      question:
        "หากพบปัญหาขยะตกค้างหรือต้องการแจ้งให้จัดเก็บขยะในชุมชน ต้องติดต่อหน่วยงานใด?",
      answer:
        "ท่านสมารถแจ้งปัญหาขยะตกค้างได้หลายช่องทาง ดังนี้:\n\t• สายด่วน กทม. 1555 (ตลอด 24 ชั่วโมง)\n\t• แอปพลิเคชัน Traffy Fondue\n\t• ติดต่อฝ่ายรักษาความสะอาดของสำนักงานเขตในพื้นที่โดยตรง\n\t• เว็บไซต์ของกรุงเทพมหานคร www.bangkok.go.th",
    },
    {
      question:
        "ฉันต้องการชำระภาษีที่ดินและสิ่งปลูกสร้าง ต้องดำเนินการอย่างไรและชำระได้ที่ไหนบ้าง?",
      answer:
        "การชำระภาษีที่ดินและสิ่งปลูกสร้างสามารถดำเนินการได้ดังนี้:\n\t• ชำระที่ฝ่ายรายได้ สำนักงานเขตที่ที่ดินหรือสิ่งปลูกสร้างตั้งอยู่\n\t• ชำระผ่านธนาคารที่ร่วมให้บริการ\n\t• ชำระผ่านแอปพลิเคชันธนาคาร\n\t• ชำระผ่านเคาน์เตอร์เซอร์วิส\n\nเอกสารที่ต้องเตรียม:\n\t• หนังสือแจ้งการประเมินภาษี\n\t• บัตรประจำตัวประชาชน",
    },
  ];

  const handleToggle = (index: number) => {
    setToggles((prev) => {
      const isOpen = prev.find((t) => t === index);
      if (isOpen !== undefined) {
        return prev.filter((t) => t !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
        <div className="text-center mb-12">
          <FaRegQuestionCircle className="text-[#00744B] w-[80px] h-[80px]" />
          <h2 className="text-3xl font-bold mb-4">คำถามที่พบบ่อย</h2>
          <p className="text-gray-600 font-semibold">
            คำตอบสำหรับข้อสงสัยเกี่ยวกับบริการต่างๆ ของกรุงเทพมหานคร
          </p>
        </div>
        <div className="">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md p-6 border border-gray-200 border-solid"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-[#00744B] m-0">
                  {faq.question}
                </h3>
                <div
                  className="cursor-pointer text-[#00744B] bg-[#00744B] rounded-full p-2 bg-opacity-10 flex items-center justify-center"
                  onClick={() => handleToggle(index)}
                >
                  {toggles.includes(index) ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </div>
              </div>
              {faq.answer && toggles.includes(index) && (
                <div
                  className="text-gray-600 text-sm whitespace-break-spaces"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
