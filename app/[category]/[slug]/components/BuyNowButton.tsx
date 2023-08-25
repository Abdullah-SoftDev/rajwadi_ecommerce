'use client'
import { auth } from "@/firebase/firebaseConfig";
import { createCheckout } from "@/lib";
import { TProduct } from "@/types/typescript.types";
import { useAuthState } from "react-firebase-hooks/auth";

const BuyNowButton = ({ product }: { product: TProduct }) => {
    const [user] = useAuthState(auth);
    const handleBuyNowClick = () => {
        if (!user) {
            alert('Login first')
            return
        }
            createCheckout(user, {
                cartData: [product],
            });
    };

    return (
        <>
            <button
                type="button"
                onClick={handleBuyNowClick}
                className="flex-none bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                Buy Now
            </button>
        </>
    )
}

export default BuyNowButton