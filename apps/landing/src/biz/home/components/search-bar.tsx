export const SearchBar = () => {
  return (
    <>
      <div className="flex justify-center mb-8 lg:px-20 px-4">
        <div className="relative w-full max-w-4xl flex">
          <input
            type="text"
            placeholder="ค้นหาบริการในกรุงเทพมหานคร"
            className="w-full px-4 md:px-8 py-4 rounded-full border-[#0063D533] border drop-shadow-lg outline-none min-h-[26px] text-sm md:text-base "
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-4 md:px-12 py-2 rounded-full text-sm md:text-lg font-semibold">
            ค้นหา
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 text-white mb-16 px-4">
        <span>คำค้นหาที่ใช้บ่อย : ต่ออายุบัตรประชาชน, ย้ายทะเบียนบ้าน</span>
      </div>
    </>
  );
};
