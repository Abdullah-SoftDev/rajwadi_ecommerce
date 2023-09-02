import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TCart, TCartData } from "@/types/typescript.types";
import { auth, db } from "@/firebase/firebaseConfig";
import { query, collection, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { handelDecrementQty, handelIncrementQty } from "@/app/actions";
import { fetchUserData } from "@/repositories/userRepository/clientsideFunctions";
import { User } from "firebase/auth";
import { createCheckout } from "@/lib";
import Link from "next/link";

const Cart = ({ cartOpen, setCartOpen }: TCart) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData(user, setUserData);
    }
  }, [user]);

  const cartQuery = query(
    collection(db, `users/${user?.uid}/cart`),
    orderBy("createdAt")
  );

  const [cartDataFromQuery] = useCollectionData(cartQuery);
  const cartData = cartDataFromQuery as TCartData[];

  const removeFromCart = async (id: string) => {
    if (!user) {
      alert("Login first");
      return;
    }
    await deleteDoc(doc(db, `users/${user?.uid}/cart/${id}`));
  };

  const incrementQty = async (id: string) => {
    if (userData) {
      await handelIncrementQty(userData, id);
    }
  };

  const decrementQty = async (id: string) => {
    if (userData) {
      await handelDecrementQty(userData, id);
    }
  };

  const totalSum: number = cartData?.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const handleBuyNowClick = () => {
    if (!user) {
      alert("Login first");
      return;
    }
    createCheckout(user, { cartData });
  };

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cartData?.length === 0 ? (
                        <h2 className="text-xl text-red-500 m-auto py-4">
                          No products available at the moment.
                        </h2>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartData?.map((product, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.productImages[0]}
                                      alt={product.productName}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>{product.productName}</p>
                                        </h3>
                                        <p className="ml-4">₹{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Size: {product.selectedSize}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <form
                                          action={() =>
                                            decrementQty(product.id!)
                                          }
                                        >
                                          <button
                                            type="submit"
                                            className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              className="h-4 w-4"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 12H4"
                                              />
                                            </svg>
                                          </button>
                                        </form>

                                        <p className="mx-2 text-black">
                                          {product?.quantity}
                                        </p>

                                        <form
                                          action={() =>
                                            incrementQty(product.id!)
                                          }
                                        >
                                          <button
                                            type="submit"
                                            className="p-1 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              className="h-4 w-4"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                              />
                                            </svg>
                                          </button>
                                        </form>
                                      </div>

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            removeFromCart(product.id!)
                                          }
                                          type="button"
                                          className="font-medium text-purple-600 hover:text-purple-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {!(cartData?.length === 0) && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{totalSum}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6 flex justify-between">
                          <button
                            type="button"
                            onClick={handleBuyNowClick}
                            className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                          >
                            Checkout
                          </button>
                          <Link
                            href={"/checkout"}
                            onClick={() => setCartOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                          >
                            Cash on Delivery
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-purple-600 hover:text-purple-500"
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;