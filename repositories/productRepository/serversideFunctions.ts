import { db } from "@/firebase/firebaseConfig";
import { TBannerImage, TOfflineOrder, TOnlineOrder, TProduct } from "@/types/typescript.types";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";

export const getProducts = async (category: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef,
        where('category', '==', category),
        orderBy('createdAt'),
    ));
    const products: TProduct[] = querySnapshot.docs.map((doc) =>
        doc.data() as TProduct
    );
    return products;
};


export const getProduct = async (slug: string) => {
    const productRef = doc(db, "products", slug);
    const docSnapshot = await getDoc(productRef);
    const productData = docSnapshot.data() as TProduct;
    return productData;
};

export const getRecommendedProducts = async (category: string, slug: string) => {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
    const products: TProduct[] = querySnapshot.docs.map((doc) =>
        doc.data() as TProduct
    );
    const filteredProducts = products.filter((product) => product.slug !== slug);
    return filteredProducts;
}

export const getBannerImages = async () => {
    const productsRef = collection(db, 'bannerImages');
    const querySnapshot = await getDocs(query(productsRef));
    const bannerImages: TBannerImage[] = querySnapshot.docs.map((doc) =>
        doc.data() as TBannerImage
    );
    return bannerImages;
}

export const getMyOnlineOrders = async (uid: string) => {
    const orderRef = collection(db, 'orders');
    const querySnapshot = await getDocs(query(orderRef, where('userId', '==', uid)));

    const orders: TOnlineOrder[] = querySnapshot.docs.map((doc) => ({
        type: 'online',
        ...(doc.data() as TOnlineOrder),
    }));

    return orders;
};

export const getMyOfflineOrders = async (uid: string) => {
    const orderRef = collection(db, 'offlineOrders');
    const querySnapshot = await getDocs(query(orderRef, where('userId', '==', uid)));

    const orders: TOfflineOrder[] = querySnapshot.docs.map((doc) => ({
        type: 'offline',
        ...(doc.data() as TOfflineOrder),
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
    const products: TProduct[] = querySnapshot.docs.map((doc) =>
        doc.data() as TProduct
    );
    return products;
};