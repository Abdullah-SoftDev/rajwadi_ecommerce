'use client'

import { auth, db } from "@/firebase/firebaseConfig";
import { handelCheckoutSubmit, handelPincodeInfo } from "@/repositories/productRepository/clientsideFunctions";
import { TCartData, TCheckoutData, TCheckoutForm } from "@/types/typescript.types";
import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

export default function Page() {
    const [checkoutForm, setCheckoutForm] = useState<TCheckoutForm>({
        email: "",
        name: "",
        phonenumber: "",
        address: "",
    })

    const [pincode, setPincode] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [user] = useAuthState(auth);
    const router = useRouter()

    const cartQuery = query(collection(db, `users/${user?.uid}/cart`), orderBy("createdAt"));
    const [cartDataFromQuery] = useCollectionData(cartQuery);
    const cartData = cartDataFromQuery as TCartData[]

    const cartsRef = collection(db, `users/${user?.uid}/cart`);
    const [cartSnapshots] = useCollection(cartsRef);

    const totalSum = cartData?.reduce((accumulator, item) => {
        return accumulator + item.price * item.quantity;
    }, 0);

    const handelInputCheckout = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCheckoutForm({ ...checkoutForm, [name]: value });
    }

    const pincodeInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await handelPincodeInfo(pincode, setCity, setState)
    };

    const checkoutSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const checkoutData: TCheckoutData = {
            checkoutForm,
            pincode,
            city,
            state,
            totalSum: Number(totalSum),
            cartData,
            cartSnapshots,
            setCheckoutForm,
            setPincode,
            setCity,
            setState
        };
        await handelCheckoutSubmit(checkoutData, user!);
        router.push('/success');
    };

    return (
        <div className="max-w-4xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <form onSubmit={checkoutSubmit} className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    value={checkoutForm.email}
                                    onChange={handelInputCheckout}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={checkoutForm.name}
                                        onChange={handelInputCheckout}
                                        type="text"
                                        name="name"
                                        autoComplete="given-name"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={checkoutForm.phonenumber}
                                        onChange={handelInputCheckout}
                                        type="number"
                                        name="phonenumber"
                                        id="phone"
                                        autoComplete="tel"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={checkoutForm.address}
                                        onChange={handelInputCheckout}
                                        type="text"
                                        name="address"
                                        autoComplete="street-address"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 flex space-x-3">
                                    <p>Pincode</p>
                                    <button onClick={pincodeInfo}>Autofill State and City</button>
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)} type="number"
                                        name="pincode"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={city}
                                        type="text"
                                        name="city"
                                        autoComplete="address-level2"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={state}
                                        type="text"
                                        name="state"
                                        autoComplete="address-level1"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center mx-auto rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full max-w-sm mt-6">
                            Checkout
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
