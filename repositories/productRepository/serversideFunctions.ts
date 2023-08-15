import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getProducts = async (category: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
    const products: Product[] = querySnapshot.docs.map((doc) => 
        doc.data() as Product
    );
    return products;
};

export const getProduct = async (slug: string) => {
    const productRef = doc(db, "products", slug);
    const docSnapshot = await getDoc(productRef);
    const productData = docSnapshot.data() as Product;
    return productData;
};
  