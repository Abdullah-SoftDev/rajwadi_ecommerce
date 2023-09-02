"use client";

import { auth, db } from "@/firebase/firebaseConfig";
import {
  handelCheckoutSubmit,
  handelPincodeInfo,
} from "@/repositories/productRepository/clientsideFunctions";
import {
  TCartData,
  TCheckoutData,
  TCheckoutForm,
} from "@/types/typescript.types";
import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

export default function Page() {
  const [checkoutForm, setCheckoutForm] = useState<TCheckoutForm>({
    email: "",
    name: "",
    phonenumber: "",
    address: "",
  });

  const [pincode, setPincode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const cartQuery = query(
    collection(db, `users/${user?.uid}/cart`),
    orderBy("createdAt")
  );
  const [cartDataFromQuery] = useCollectionData(cartQuery);
  const cartData = cartDataFromQuery as TCartData[];

  const cartsRef = collection(db, `users/${user?.uid}/cart`);
  const [cartSnapshots] = useCollection(cartsRef);

  const totalSum = cartData?.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const handelInputCheckout = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const pincodeInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handelPincodeInfo(pincode, setCity, setState);
  };

  const checkoutSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkoutForm || !pincode || !city || !state || !user) {
    alert("Please fill in all required fields");
    return;
    }
    setIsLoading(true);
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
      setState,
    };

    try {
      await handelCheckoutSubmit(checkoutData, user);
      setIsLoading(false);
      router.push("/success");
    } catch (error) {
      console.error("Error during checkout:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4">
      <form
        onSubmit={checkoutSubmit}
        className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16"
      >
        <div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Contact information
            </h2>

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
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">
              Shipping information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={checkoutForm.name}
                    onChange={handelInputCheckout}
                    type="text"
                    name="name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    value={checkoutForm.phonenumber}
                    onChange={handelInputCheckout}
                    type="number"
                    name="phonenumber"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    value={checkoutForm.address}
                    onChange={handelInputCheckout}
                    type="text"
                    name="address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex space-x-3">
                  <p>Pincode</p>
                  <button className="text-red-500" onClick={pincodeInfo}>
                    Autofill State and City
                  </button>
                </label>
                <div className="mt-1">
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    type="number"
                    name="pincode"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    value={city}
                    type="text"
                    name="city"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <div className="mt-1">
                  <input
                    value={state}
                    type="text"
                    name="state"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-purple-500 mt-8 border border-transparent rounded-full py-3 px-8 flex items-center justify-center mx-auto text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#bf86da] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing.." : "Checkout"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}