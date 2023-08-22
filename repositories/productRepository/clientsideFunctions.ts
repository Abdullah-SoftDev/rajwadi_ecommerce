import { Product } from "@/types/typescript.types";
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

export const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, setData: Function) => {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
        const uploadedImages = Array.from(e.target.files);
        const imageDataURLs: string[] = [];

        for (const file of uploadedImages) {
            imageDataURLs.push(await readImageFile(reader, file));
        }

        try {
            setData((prevData: Product) => ({
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