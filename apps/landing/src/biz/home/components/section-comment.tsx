export const SectionComment = () => {
  const comments = [
    {
      avatar: "/images/avatar1.png",
      date: "25 ก.ค 2567",
      comment:
        "แนะนำชาวกทม.ใช้บริการต่ออายุบัตรประชาชนด่วนที่สถานี BTS  สะดวก รวดเร็วมากๆ",
    },
    {
      avatar: "/images/avatar2.png",
      date: "25 ก.ค 2567",
      comment: "ใช้บริการดีมากๆ สะดวก รวดเร็วมากๆ",
    },
    {
      avatar: "/images/avatar3.png",
      date: "25 ก.ค 2567",
      comment: "ข้อมูลที่ต้องการรู้อ่านเข้าใจง่าย ค้นหาได้ไว สะดวกมากครับ",
    },
    {
      avatar: "/images/avatar4.png",
      date: "25 ก.ค 2567",
      comment: "ได้ทดลองใช้และเตรียมเอกสารข้อมูลครบถ้วน ยอดเยี่ยม",
    },
    {
      avatar: "/images/avatar4.png",
      date: "25 ก.ค 2567",
      comment: "ได้ทดลองใช้และเตรียมเอกสารข้อมูลครบถ้วน ยอดเยี่ยม",
    },
  ];
  return (
    <div className="bg-gradient-to-r from-[#00744B] to-[#6DD2CF] py-12">
      <div className="bg-[url('/images/comment.png')] bg-contain bg-right bg-no-repeat">
        <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            ความเห็นของประชาชน
          </h2>
          <p className="text-center text-white mb-8 text-lg">
            คำแนะนำและข้อคิดเห็นในบริการต่างๆ ของกรุงเทพมหานคร
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-slide gap-4 infinite-slide">
            {[...comments, ...comments].map((comment, index) => (
              <CommentCard key={index} {...comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// You'll need to create this component separately
const CommentCard = ({
  avatar,
  date,
  comment,
}: {
  avatar: string;
  date: string;
  comment: string;
}) => {
  return (
    <div className="bg-white rounded-lg px-6 shadow-md py-2 min-w-[300px]">
      <div className="flex items-center gap-3 justify-between py-1">
        <img
          src={avatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-[#00744B] border-solid"
        />
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
      <p className="text-gray-700 text-sm m-0 my-1">{comment}</p>
    </div>
  );
};
