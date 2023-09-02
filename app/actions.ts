"use server";

import { db, storage } from "@/firebase/firebaseConfig";
import { TCartData, TProduct, TUpdateProduct } from "@/types/typescript.types";
import { User } from "firebase/auth";
import {
  serverTimestamp,
  Timestamp,
  setDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  query,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

export const handleSubmitBannerImage = async (image: string) => {
  const storageRef = ref(
    storage,
    `BannerImages/${Timestamp.now().seconds}/${Math.random()
      .toString(36)
      .substring(7)}`
  );
  await uploadString(storageRef, image, "data_url");
  const downloadURL = await getDownloadURL(storageRef);
  const newId = doc(collection(db, "ids")).id;
  const cartRef = doc(db, `bannerImages/${newId}`);
  await setDoc(cartRef, {
    id: newId,
    bannerUrl: downloadURL,
  });
};

export const handelSubmitProductForm = async (data: TProduct) => {
  const {
    productName,
    slug,
    productDescription,
    productImages,
    price,
    category,
    sizes,
    stockAvailable,
  } = data;
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
    quantity: 1,
  };

  await setDoc(doc(db, "products", `${newData.slug}`), newData);
  console.log(newData);
};

export const handelAddToCart = async (cartData: TCartData, userData: User) => {
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
    const newId = doc(collection(db, "ids")).id;
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

export const handelIncrementQty = async (userData: User, id: string) => {
  const cartRef = doc(db, `users/${userData?.uid}/cart/${id}`);
  const cartSnapshot = await getDoc(cartRef);
  if (cartSnapshot.exists()) {
    await updateDoc(cartRef, {
      quantity: increment(1),
    });
  }
};

export const handelDecrementQty = async (userData: User, id: string) => {
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
};

export const handelSubmitProductFormImgs = async (data: TProduct) => {
  const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
  const downloadURLs: string[] = [];

  for (const item of data.productImages) {
    const filePath = `image_${Date.now()}.png`; // Generate unique file path
    const imageRef = ref(storageRef, filePath); // Create a reference for each image
    await uploadString(imageRef, item, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    downloadURLs.push(downloadURL);
  }
  return downloadURLs;
};

export const handelUpdateFormImgs = async (data: TUpdateProduct) => {
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

export async function handelSearch(searchQuery: string) {
  if (searchQuery) {
    const cleanedSearchQuery = searchQuery.trim().replace(/\s+/g, " ");
    const lowerCaseSearchQuery = cleanedSearchQuery.toLowerCase();
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", ">=", lowerCaseSearchQuery));
    const querySnapshot = await getDocs(q);
    const results: TProduct[] = querySnapshot.docs.map(
      (doc) => doc.data() as TProduct
    );
    return results;
  }
}

export async function deliveredOrder(id: string) {
  // Check if the document exists in 'offers' collection
  const offersRef = doc(db, "orders", id);
  const offersDoc = await getDoc(offersRef);

  if (offersDoc.exists()) {
    await deleteDoc(offersRef);
    console.log('Document deleted from "offers" collection');
  }

  // Check if the document exists in 'offlineOffers' collection
  const offlineOffersRef = doc(db, "offlineOrders", id);
  const offlineOffersDoc = await getDoc(offlineOffersRef);

  if (offlineOffersDoc.exists()) {
    await deleteDoc(offlineOffersRef);
    console.log('Document deleted from "offlineOffers" collection');
  }
}

export const handleDeleteProduct = async (slug: string) => {
  const productRef = doc(db, `products/${slug}`);
  await deleteDoc(productRef);
};