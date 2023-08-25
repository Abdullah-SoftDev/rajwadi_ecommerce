// import { getProducts } from "@/repositories/productRepository/serversideFunctions";
import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
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
    const products: Product[] = querySnapshot.docs.map((doc) =>
      doc.data() as Product
    );
    return products;
  };

  const productsList = await getProducts(category);

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
