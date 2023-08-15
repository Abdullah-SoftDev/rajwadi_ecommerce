import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getProducts = async (category: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
    const products: Product[] = querySnapshot.docs.map((doc) => 
        doc.data() as Product
    );
    return products;
};
  