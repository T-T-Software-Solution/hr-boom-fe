export const SectionWeblink = () => {
  const weblinks = [
    {
      id: 1,
      name: "BMW BKK",
      image: "/images/weblinks/BMW_BKK_logo.png",
      url: "#",
    },
    {
      id: 2,
      name: "BKK PUBLIC",
      image: "/images/weblinks/BKK_Public_Logo.png",
      url: "#",
    },
    {
      id: 3,
      name: "BKK Pfalz",
      image: "/images/weblinks/BKK-Pfalz-Logo.png",
      url: "#",
    },
    {
      id: 4,
      name: "BKK",
      image: "/images/weblinks/EVM_BKK_Logo.png",
      url: "#",
    },
    {
      id: 5,
      name: "BKK O",
      image: "/images/weblinks/BKK_logo_notext.png",
      url: "#",
    },
    {
      id: 6,
      name: "BKK Advita",
      image: "/images/weblinks/BKK-advita-Logo.png",
      url: "#",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl lg:px-20 px-4 pb-12 pt-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        เว็บลิงก์ (Web Link)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {weblinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-md transition-shadow border border-gray-200 border-solid"
          >
            <img src={link.image} alt={link.name} className="max-h-12 w-auto" />
          </a>
        ))}
      </div>
    </div>
  );
};
