import { db } from "@/firebase/firebaseConfig";
import { BannerImage, OnlineOrder, Order, Product } from "@/types/typescript.types";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";

export const getProducts = async (category: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef,
        where('category', '==', category),
        orderBy('createdAt'),
    ));
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

export const getRecommendedProducts = async (category: string, slug: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
    const products: Product[] = querySnapshot.docs.map((doc) =>
        doc.data() as Product
    );
    const filteredProducts = products.filter((product) => product.slug !== slug);
    return filteredProducts;
}

export const getBannerImages = async () => {
    const productsRef = collection(db, 'bannerImages');
    const querySnapshot = await getDocs(query(productsRef));
    const bannerImages: BannerImage[] = querySnapshot.docs.map((doc) =>
        doc.data() as BannerImage
    );
    return bannerImages;
}

export const getMyOnlineOrders = async (uid: string) => {
    const orderRef = collection(db, 'orders');
    const querySnapshot = await getDocs(query(orderRef, where('userId', '==', uid)));

    const orders: Order[] = querySnapshot.docs.map((doc) => ({
        type: 'online',
        ...(doc.data() as Order),
    }));

    return orders;
};

export const getMyOfflineOrders = async (uid: string) => {
    const orderRef = collection(db, 'offlineOrders');
    const querySnapshot = await getDocs(query(orderRef, where('userId', '==', uid)));

    const orders: OnlineOrder[] = querySnapshot.docs.map((doc) => ({
        type: 'offline',
        ...(doc.data() as OnlineOrder),
    }));

    return orders;
};

export const getRecentOrders = async () => {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const recentOrders = querySnapshot.docs.map((doc) =>
        doc.data()
    );
    return recentOrders;
};

export const viewAllProducts = async () => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef));
    const products: Product[] = querySnapshot.docs.map((doc) =>
        doc.data() as Product
    );
    return products;
};