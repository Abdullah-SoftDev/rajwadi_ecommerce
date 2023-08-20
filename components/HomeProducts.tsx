import Link from "next/link";

const collections = [
  {
    imageSrc: "/bride-and-groom.jpg",
    heading: "Bride",
    href: "/bride-and-groom",
  },
  {
    imageSrc: "/saree.jpg",
    heading: "Saree",
    href: "/saree",
  },
  {
    imageSrc: "/lehenga-choli.jpg",
    heading: "Lehenga Choli",
    href: "/lehenga-choli",
  },
  {
    imageSrc: "/salwar-kameez.jpg",
    heading: "Salwar Kameez",
    href: "/salwar-kameez",
  },
  {
    imageSrc: "/mens.jpg",
    heading: "Mens",
    href: "/mens",
  },
  {
    imageSrc: "/kids.jpg",
    heading: "Kids",
    href: "/kids",
  },
];

const HomeProducts = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center text-3xl pb-6">Top Collections</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {collections.map((collection, index) => (
          <Link key={index} href={collection.href}>
            <div className="aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <div className="relative group">
                <img
                  src={collection.imageSrc}
                  alt={collection.heading}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                />
                <h2 className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 px-4 text-lg font-medium">
                  {collection.heading}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/saree" className="sm:ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none">
          Explore More Button
        </Link>
      </div>
    </div>
  );
};
export default HomeProducts;
