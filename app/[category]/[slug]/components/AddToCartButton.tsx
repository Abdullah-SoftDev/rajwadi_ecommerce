'use client'

import { handelAddToCart } from "@/app/actions";
import { auth } from "@/firebase/firebaseConfig";
import { fetchUserData } from "@/repositories/userRepository/clientsideFunctions";
import { TCartData, TProduct } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


const AddToCartButton = ({ product, selectedSize }: { product: TProduct, selectedSize: string }) => {
    const { productName, productDescription, price, productImages, slug, category, quantity } = product;
    const [user] = useAuthState(auth);

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            fetchUserData(user, setUserData);
        }
    }, [user]);

    const addToCart = async () => {
        if (!user) {
            alert('Login first');
            return;
        }
        const cartData: TCartData = {
            productName: productName,
            productDescription: productDescription,
            price: Number(price),
            productImages: productImages,
            slug: slug,
            category: category,
            quantity: quantity!,
            selectedSize: selectedSize,
        };
        await handelAddToCart(cartData, userData!);
    }


    return (
        <form action={addToCart}>
            <button
                type="submit"
                className="flex-none bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                Add to bag
            </button>
        </form>
    );
}

export default AddToCartButton;