import Link from "next/link";

const collections = [
  {
    imageSrc: "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/dOyXoEjc.webp",
    altText: "airpods",
    heading: "Airpod",
    href: "/airpod",
    title: "Premium Airpods",
    price: "$199.99",
  },
  {
    imageSrc: "https://codeswear.com/_next/image?url=https%3A%2F%2Fcodeswear.nyc3.cdn.digitaloceanspaces.com%2Fconstants%2Flanding%2Fcollections%2Foversizedtshirt.webp&w=1920&q=75",
    altText: "tshirts",
    heading: "Tshirts",
    href: "/tshirts",
    title: "Trendy Tshirts",
    price: "$29.99",
  },
  {
    imageSrc: "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/1An0xNDS.webp",
    altText: "iwatch",
    heading: "Iwatch",
    href: "/iwatch",
    title: "Smart Iwatch",
    price: "$349.99",
  },
];

const HomeProducts = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center text-3xl pb-4">Top Collections🔥</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {collections.map((collection, index) => (
          <Link key={index} href={collection.href} className="block mb-8">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <div className="relative group">
                <img
                  src={collection.imageSrc}
                  alt={collection.altText}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                />
                <h2 className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 px-4 text-lg font-medium">
                  {collection.heading}
                </h2>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">{collection.title}</h3>
              <p className="text-gray-600">{collection.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
      <button className="sm:ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none">
                  Explore More Button
                </button>
      </div>
    </div>
  );
};
export default HomeProducts;
