import { db } from "@/firebase/firebaseConfig";
import { TCheckoutData, TProduct } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { writeBatch, serverTimestamp, doc, collection } from "firebase/firestore";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from 'uuid';

export const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setData: Function) => {
    const { name, value } = e.target;
    if (name === "productName") {
        const slug = value?.toLowerCase()?.replaceAll(' ', '-');
        setData((prevData: TProduct) => ({
            ...prevData,
            [name]: value,
            slug,
        }));
    } else {
        setData((prevData: TProduct) => ({
            ...prevData,
            [name]: value,
        }));
    }
};

export const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
        const uploadedImages = Array.from(e.target.files);
        const imageDataURLs: string[] = [];

        for (const file of uploadedImages) {
            imageDataURLs.push(await readImageFile(reader, file));
        }

        try {
            setData((prevData: TProduct) => ({
                ...prevData,
                productImages: imageDataURLs,
            }));
        } catch (error) {
            console.error("Image upload error:", error);
        }
    }
};

const readImageFile = (reader: FileReader, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
            const result = readerEvent?.target?.result;
            if (typeof result === "string") {
                resolve(result);
            } else {
                reject(new Error("Failed to read image."));
            }
        };
    });
};

export const handleImageClick = (index: number, setData: Function) => {
    setData((prevData: TProduct) => {
        const updatedImages = [...prevData.productImages];
        updatedImages?.splice(index, 1);
        return {
            ...prevData,
            productImages: updatedImages,
        };
    });
};

export const handleStockAvailableChange = (checked: boolean, setData: Function) => {
    setData((prevData: TProduct) => ({
        ...prevData,
        stockAvailable: checked,
    }));
};

export const handleSizeToggle = (selectedSize: string, setData: Function) => {
    setData((prevData: TProduct) => ({
        ...prevData,
        sizes: prevData?.sizes?.includes(selectedSize)
            ? prevData?.sizes?.filter(size => size !== selectedSize)
            : [...prevData.sizes, selectedSize],
    }));
};

export const handelCancelForm = (setData: Function) => {
    setData({
        productName: "",
        slug: "",
        productDescription: "",
        productImages: [],
        price: "",
        category: "",
        sizes: [],
        stockAvailable: false,
    });
}

export const handelCheckoutSubmit = async (checkoutData: TCheckoutData, user: User) => {
    const {
        checkoutForm,
        pincode,
        city,
        state,
        totalSum,
        cartData,
        cartSnapshots,
        setCheckoutForm,
        setPincode,
        setCity,
        setState
    } = checkoutData;

    const batch = writeBatch(db);
    const orderData = {
        email: checkoutForm.email,
        name: checkoutForm.name,
        phonenumber: checkoutForm.phonenumber,
        address: checkoutForm.address,
        pincode,
        city,
        state,
        userId: user?.uid,
        orderId: uuidv4(),
        amount: totalSum,
        createdAt: serverTimestamp(),
        orderItems: cartData,
    };

    const newOrderDocRef = doc(collection(db, 'offlineOrders'));
    batch.set(newOrderDocRef, orderData);

    if (cartSnapshots && user) {
        cartSnapshots.docs.forEach((docSnapshot: any) => {
            const cartDocRef = doc(db, `users/${user.uid}/cart`, docSnapshot.id);
            batch.delete(cartDocRef);
        });
    }

    await batch.commit();
    setCheckoutForm({
        email: '',
        name: '',
        phonenumber: '',
        address: '',
    });
    setPincode('');
    setCity('');
    setState('');
};

export const handelPincodeInfo = async (pincode: string, setCity: Dispatch<SetStateAction<string>>, setState: Dispatch<SetStateAction<string>>) => {
    if (pincode.length === 6) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

            if (!response.ok) {
                alert('Failed to fetch pincode information');
                return;
            }

            const data = await response.json();
            const res = data[0]?.PostOffice[0];
            setCity(res.Name);
            setState(res.State);
        } catch (error) {
            console.error('Error fetching pincode information:', error);
            alert('An error occurred while fetching pincode information');
        }
    } else {
        alert('Use proper pincode');
        setCity('');
        setState('');
    }
}
