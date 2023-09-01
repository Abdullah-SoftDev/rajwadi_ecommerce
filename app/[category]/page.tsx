import InfiniteScrollTesting from "./components/InfiniteScrollTesting";
import { getProducts } from "@/repositories/productRepository/serversideFunctions";

interface Props {
  params: { category: string };
}

const Page = async ({ params }: Props) => {
  const { category } = params;

  const productsList = await getProducts(category);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="md:flex">
        <h2 className="text-center text-xl capitalize mb-8">
          Buy Latest{" "}
          <span className="font-semibold text-[#ca7dee]">{category}</span>
        </h2>
      </div>

      {productsList.length === 0 ? (
        <div className="h-96 flex">
          <h2 className="text-xl text-red-500 m-auto">
            No products available at the moment.
          </h2>
        </div>
      ) : (
        <InfiniteScrollTesting
          productsList={productsList}
          category={category}
        />
      )}
    </div>
  );
};

export default Page;