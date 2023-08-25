'use client'

import { auth, db } from "@/firebase/firebaseConfig";
import { TCheckoutForm } from "@/types/typescript.types";
import { collection, doc, orderBy, query, serverTimestamp, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from 'uuid';


export default function Page() {
    const [checkoutForm, setCheckoutForm] = useState<TCheckoutForm>({
        email: "",
        name: "",
        phonenumber: "",
        address: "",
    })

    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [user] = useAuthState(auth);
    const router = useRouter()

    const cartQuery = query(collection(db, `users/${user?.uid}/cart`), orderBy("createdAt"));
    const [cartData, loading] = useCollectionData(cartQuery);

    const cartsRef = collection(db, `users/${user?.uid}/cart`);
    const [cartSnapshots, loading2] = useCollection(cartsRef);

    const totalSum = cartData?.reduce((accumulator, item) => {
        return accumulator + item.price * item.quantity;
    }, 0);

    const handelInputCheckout = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCheckoutForm({ ...checkoutForm, [name]: value });
    }

    const handlePincodeChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (pincode.length === 6) {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            const res = data[0]?.PostOffice[0];
            setCity(res.Name);
            setState(res.State);
        } else {
            setCity('');
            setState('');
        }
    }

    const handelCheckoutSubmit = async () => {
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
            cartSnapshots.docs.forEach((docSnapshot:any) => {
                const cartDocRef = doc(db, `users/${user.uid}/cart`, docSnapshot.id);
                batch.delete(cartDocRef);
            });
        }
    
        await batch.commit();
        router.push('/success');
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

    return (
        <div className="max-w-4xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <form action={handelCheckoutSubmit} className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
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
                                    <button onClick={handlePincodeChange}>Autofill State and City</button>
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
