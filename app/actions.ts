'use server'

import { db, storage } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { serverTimestamp, Timestamp, setDoc, doc, deleteDoc, collection, getDocs, getDoc, updateDoc, increment } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

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

export const handelSubmitForm = async (data: Product) => {
    const { productName, slug, productDescription, productImages, price, category, sizes, stockAvailable } = data;
    const newData: Product = {
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
    productName: string, productDescription: string, price: string | number, productImages: (string | File)[], slug: string, category: string, userData: User | null, quantity: number, selectedSize: string
) => {
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