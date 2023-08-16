import { storage } from "@/firebase/firebaseConfig";
import { Product } from "@/types/typescript.types";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChangeEvent } from "react";

export const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setData: Function) => {
    const { name, value } = e.target;
    if (name === "productName") {
        const slug = value?.toLowerCase()?.replaceAll(' ', '-');
        setData((prevData: Product) => ({
            ...prevData,
            [name]: value,
            slug,
        }));
    } else {
        setData((prevData: Product) => ({
            ...prevData,
            [name]: value,
        }));
    }
};

export const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
    const files = e.target.files;
    if (files) {
        const imageUrls = Array?.from(files);
        setData((prevData: Product) => ({
            ...prevData,
            productImages: imageUrls,
        }));
    }
};

export const handleSubmitImage = async (
    data: Product,
    setData: Function,
    setIsImgUpLoading: Function,
    setIsImgUploaded: Function
) => {
    if (data.productImages.length === 0) return;
    try {
        setIsImgUpLoading(true);

        const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
        const downloadURLs: string[] = [];

        for (const item of data.productImages) {
            if (!(typeof item === 'string')) {
                const file = item as File;
                const filePath = `${storageRef.fullPath}/${file.name}`;

                await uploadBytes(ref(storage, filePath), item);

                const fileRef = ref(storage, filePath);
                const downloadURL = await getDownloadURL(fileRef);

                downloadURLs.push(downloadURL);
            }
        }

        setData((prevData: Product) => ({
            ...prevData,
            productImages: downloadURLs,
        }));
        setIsImgUploaded(true);
    } catch (error) {
        console.log(error);
    } finally {
        setIsImgUpLoading(false);
    }
};

export const handleImageClick = (index: number, setData: Function) => {
    setData((prevData: Product) => {
        const updatedImages = [...prevData.productImages];
        updatedImages?.splice(index, 1);
        return {
            ...prevData,
            productImages: updatedImages,
        };
    });
};

export const handleStockAvailableChange = (checked: boolean, setData: Function) => {
    setData((prevData: Product) => ({
        ...prevData,
        stockAvailable: checked,
    }));
};

export const handleSizeToggle = (selectedSize: string, setData: Function) => {
    setData((prevData: Product) => ({
        ...prevData,
        sizes: prevData?.sizes?.includes(selectedSize)
            ? prevData?.sizes?.filter(size => size !== selectedSize)
            : [...prevData.sizes, selectedSize],
    }));
};

export const cancelForm = (setData: Function) => {
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