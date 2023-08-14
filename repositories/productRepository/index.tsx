import { Product } from "@/types/typescript.types";
import { ChangeEvent, FormEvent } from "react";

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
        const imageUrls = Array?.from(files)?.map(file => URL.createObjectURL(file));
        setData((prevData: Product) => ({
            ...prevData,
            productImages: imageUrls,
        }));
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

export const handelSubmitForm = (e: FormEvent<HTMLFormElement>, data: Product, setData: Function) => {
    e.preventDefault();
    console.log(data);
    setData({
        productName: "",
        slug: "",
        productDescription: "",
        productImages: [],
        price: "",
        category: "",
        sizes: [],
        stockAvailable: false
})};
