'use client'

import { addToCart, removeFromCart } from "@/app/actions";
import { auth, db } from "@/firebase/firebaseConfig";
import { fetchUserData } from "@/repositories/userRepository/clientsideFunctions";
import { Product } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";


const AddToCartButton = ({ product }: { product: Product }) => {
    const { productName, productDescription, price, productImages, slug, category } = product;
    const [user] = useAuthState(auth);
    const [cartItemDoc] = useDocument(doc(db, `users/${user?.uid}/cart/${slug}`));

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
        await addToCart(productName, productDescription, price, productImages, slug, category, userData);
    }
    const handelRemoveToCart = async () => {
        if (!user) {
            alert('Login first');
            return;
        }
        await removeFromCart(slug, userData);
    }

    return (
        <div>
            {!cartItemDoc?.exists() ? (
                <form action={handelAddToCart}>
                    <button
                        type="submit"
                        className="flex-none bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                        Add to bag
                    </button>
                </form>
            ) : (
                <form action={handelRemoveToCart}>
                    <button type="submit"
                        className="max-w-sm flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                        Remove from bag
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddToCartButton;