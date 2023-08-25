'use server'

import { db, storage } from "@/firebase/firebaseConfig";
import { TCartData, TCheckoutForm, TOnlineOrder, TProduct, TUpdateProduct } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { serverTimestamp, Timestamp, setDoc, doc, deleteDoc, collection, getDocs, getDoc, updateDoc, increment, query, where, writeBatch, orderBy, limit, startAfter } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


export async function checkServiceability(pincode: string) {
    try {
        const response = await fetch('http://localhost:3000/api/pincodes');
        const pinjson = await response.json();
        return pinjson.includes(pincode);
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const handleSubmitBannerImage = async (image: string) => {
    const storageRef = ref(storage, `BannerImages/${Timestamp.now().seconds}/${Math.random().toString(36).substring(7)}`);
    await uploadString(storageRef, image, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    const newId = doc(collection(db, 'ids')).id;
    const cartRef = doc(db, `bannerImages/${newId}`);
    await setDoc(cartRef, {
        id: newId,
        bannerUrl: downloadURL
    });
};

export const handelSubmitForm = async (data: TProduct) => {
    const { productName, slug, productDescription, productImages, price, category, sizes, stockAvailable } = data;
    const newData: TProduct = {
        productName: productName.trim(),
        slug,
        productDescription,
        price: Number(price),
        category: category.toLowerCase(),
        productImages,
        sizes,
        stockAvailable,
        createdAt: serverTimestamp() as Timestamp,
        quantity: 1
    }

    await setDoc(doc(db, "products", `${newData.slug}`), newData);
    console.log(newData)
}

export const addToCart = async (
    cartData: TCartData,
    userData: User
) => {
    const {
        productName,
        slug,
        productDescription,
        price,
        category,
        productImages,
        quantity,
        selectedSize,
    } = cartData;
    // Check if the user's cart already contains the same product with the selected size.
    const cartQuerySnapshot = await getDocs(
        collection(db, `users/${userData?.uid}/cart`)
    );

    let existingCartItemRef = null;
    cartQuerySnapshot.forEach((doc) => {
        const cartItem = doc.data();
        if (
            cartItem.productName === productName &&
            cartItem.selectedSize === selectedSize
        ) {
            existingCartItemRef = doc.ref;
        }
    });

    if (existingCartItemRef) {
        // If the same product with selected size exists, update the quantity.
        await updateDoc(existingCartItemRef, {
            quantity: increment(quantity), // Increment the existing quantity by the new quantity.
        });
    } else {
        // If the product doesn't exist in the cart, add it as a new item.
        const newId = doc(collection(db, 'ids')).id;
        const cartRef = doc(db, `users/${userData?.uid}/cart/${newId}`);
        await setDoc(cartRef, {
            id: newId,
            productName,
            slug,
            productDescription,
            price,
            category,
            productImages,
            createdAt: serverTimestamp(),
            quantity,
            selectedSize,
        });
    }
};

export const incrementQty = async (userData: User, id: string) => {
    const cartRef = doc(db, `users/${userData?.uid}/cart/${id}`);
    const cartSnapshot = await getDoc(cartRef);
    if (cartSnapshot.exists()) {
        await updateDoc(cartRef, {
            quantity: increment(1),
        });
    }
}

export const decrementQty = async (userData: User, id: string) => {
    const cartRef = doc(db, `users/${userData?.uid}/cart/${id}`);
    const cartSnapshot = await getDoc(cartRef);
    if (cartSnapshot.exists()) {
        const currentQuantity = cartSnapshot.data().quantity;
        if (currentQuantity > 1) {
            await updateDoc(cartRef, {
                quantity: increment(-1),
            });
        } else {
            await deleteDoc(cartRef);
        }
    }
}

export const submitCreateFormImages = async (data: TProduct) => {
    const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
    const downloadURLs: string[] = [];

    for (const item of data.productImages) {
        const filePath = `image_${Date.now()}.png`; // Generate unique file path
        const imageRef = ref(storageRef, filePath); // Create a reference for each image
        await uploadString(imageRef, item, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);
        downloadURLs.push(downloadURL);
    }
    return downloadURLs;
};

export const submitUpdateFormImages = async (data: TUpdateProduct) => {
    const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
    const downloadURLs: string[] = [];

    for (const item of data.productImages) {
        const filePath = `image_${Date.now()}.png`; // Generate unique file path
        const imageRef = ref(storageRef, filePath); // Create a reference for each image
        await uploadString(imageRef, item, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);
        downloadURLs.push(downloadURL);
    }
    return downloadURLs;
};

export async function performSearch(searchQuery: string) {
    if (searchQuery) {
        const cleanedSearchQuery = searchQuery.trim().replace(/\s+/g, ' ');
        const lowerCaseSearchQuery = cleanedSearchQuery.toLowerCase();
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('category', '>=', lowerCaseSearchQuery));
        const querySnapshot = await getDocs(q);
        const results: TProduct[] = querySnapshot.docs.map(doc => doc.data() as TProduct);
        return results;
    }
}
