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

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="md:flex">
        <h2 className="text-center text-xl capitalize mb-8">
          Buy Latest <span className="font-semibold text-[#ca7dee]">{category}</span>
        </h2>
      </div>

      {productsList.length === 0 ? (
        <div className="h-96 flex">
          <h2 className="text-xl text-red-500 m-auto">
            No products available at the moment.
          </h2>
        </div>
      ) : (
          <InfiniteScrollTesting productsList={productsList} category={category} />
      )}
    </div>
  );
};

export default Page;
