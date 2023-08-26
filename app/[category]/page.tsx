import { db } from "@/firebase/firebaseConfig";
import { TProduct } from "@/types/typescript.types";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import InfiniteScrollTesting from "./components/InfiniteScrollTesting";

const Page = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const getProducts = async (category: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef,
      where('category', '==', category),
      orderBy('createdAt'), limit(1)
    ));
    const products: TProduct[] = querySnapshot.docs.map((doc) =>
      doc.data() as TProduct
    );
    return products;
  };

  const productsList = await getProducts(category);

  const Skeleton = () => (
    <div className="block mb-8">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <div className="animate-pulse bg-gray-300 w-full h-full" />
        </div>
        <div className="mt-2">
            <div className="animate-pulse h-4 bg-gray-300 mb-1 w-3/4" />
            <div className="animate-pulse h-3 bg-gray-300 w-1/4" />
        </div>
    </div>
);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="md:flex md:items-center md:justify-between py-5">
        <h2 className="text-center text-3xl capitalize">
          Explore Our {category} products
        </h2>
      </div>

      {productsList.length === 0 ? (
        <div className="h-96 flex">
          <h2 className="text-xl text-red-500 m-auto">
            No products available at the moment.
          </h2>
        </div>
      ) : (
        <InfiniteScrollTesting productsList={productsList} category={category}/>
      )}
    </div>
  );
};

export default Page;
