import { LuFileText } from "react-icons/lu";

const documents = [
  { month: "ธ.ค.", year: "2567" },
  { month: "พ.ย.", year: "2567" },
  { month: "ต.ค.", year: "2567" },
  { month: "ก.ย.", year: "2567" },
  { month: "ก.ค.", year: "2567" },
];

export const SectionSitemap = () => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <div className="flex items-center justify-start gap-4 w-full">
                <img
                  src="/icons/group-chat.svg"
                  alt="Survey Icon"
                  className="w-20 h-20"
                />
                <h3 className="text-xl font-semibold">แบบสำรวจและแบบสอบถาม</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center justify-center">
              <div className="flex items-center justify-start gap-4 w-full">
                <img
                  src="/icons/www.svg"
                  alt="Sitemap Icon"
                  className="w-20 h-20"
                />
                <h3 className="text-xl font-semibold">
                  ผังเว็บไซต์ (Site Map)
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-4">
                สิ่งพิมพ์กรุงเทพมหานคร
              </h3>
              <ul className="space-y-3 pl-0">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <LuFileText className="text-[#00744B] w-5 h-5" />
                    <a href="#" className="no-underline text-black text-sm">
                      เอกสารนโยบายกรุงเทพมหานคร ฉบับ {doc.month} {doc.year}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/bma-logo.png"
                alt="Sitemap Icon"
                className="w-full h-auto"
              />
              <h3 className="text-2xl font-semibold mb-2">ข้อมูลเปิดกรุงเทพมหานคร</h3>
              <p className="text-[#00744B] m-0">
                จากหน่วยงานในกรุงเทพมหานคร
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
