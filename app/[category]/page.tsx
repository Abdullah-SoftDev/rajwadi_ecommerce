import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/repositories/productRepository/serversideFunctions";

const Page = async ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const productsList = await getProducts(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 min-h-screen">
      <div className="md:flex md:items-center md:justify-between py-5">
        <h2 className="text-center text-3xl capitalize">
          Explore Our {category} products
        </h2>
      </div>

      {productsList.length === 0 ? (
        <div className="h-80 flex">
          <h2 className="text-xl text-red-500 m-auto">
            No products available at the moment.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productsList.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
