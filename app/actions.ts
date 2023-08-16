'use server'

import { db } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
import { serverTimestamp, Timestamp, setDoc, doc } from "firebase/firestore";

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

// export const handleSubmitImage = async (data: Product) => {
//     const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
//     const downloadURLs: string[] = [];
//     for (const item of data?.productImages) {
//         if (!(typeof item === 'string')) {
//             const file = item as File;
//             const filePath = `${storageRef.fullPath}/${file.name}`;

//             await uploadBytes(ref(storage, filePath), item);

//             const fileRef = ref(storage, filePath);
//             const downloadURL = await getDownloadURL(fileRef);

//             downloadURLs.push(downloadURL);
//         }
//     }
//     console.log(downloadURLs)
//     return downloadURLs;
// };


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
    }

    await setDoc(doc(db, "products", `${newData.slug}`), newData);
    console.log(newData)
}