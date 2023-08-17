'use client'

import { addToCart } from "@/app/actions";
import { auth } from "@/firebase/firebaseConfig";
import { fetchUserData } from "@/repositories/userRepository/clientsideFunctions";
import { Product } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


const AddToCartButton = ({ product, selectedSize }: { product: Product, selectedSize: string }) => {
    const { productName, productDescription, price, productImages, slug, category, quantity } = product;
    const [user] = useAuthState(auth);

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            fetchUserData(user, setUserData);
        }
    }, [user]);

    const handelAddToCart = async () => {
        if (!user) {
            alert('Login first');
            return;
        }
        await addToCart(productName, productDescription, price, productImages, slug, category, userData, quantity!, selectedSize);
    }


    return (
        <form action={handelAddToCart}>
            <button
                type="submit"
                className="flex-none bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                Add to bag
            </button>
        </form>
    );
}

export default AddToCartButton;