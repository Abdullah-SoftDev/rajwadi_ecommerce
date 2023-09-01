"use client";

import { handelAddToCart } from "@/app/actions";
import { auth } from "@/firebase/firebaseConfig";
import { fetchUserData } from "@/repositories/userRepository/clientsideFunctions";
import { TCartData, TProduct } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddToCartButton from "./AddToCartButton";

const AddToCartFormAction = ({
  product,
  selectedSize,
}: {
  product: TProduct;
  selectedSize: string;
}) => {
  const {
    productName,
    productDescription,
    price,
    productImages,
    slug,
    category,
    quantity,
  } = product;
  const [user] = useAuthState(auth);

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData(user, setUserData);
    }
  }, [user]);

  const addToCart = async () => {
    if (!user) {
      alert("Login first");
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
  };

  return (
    <form action={addToCart}>
      <AddToCartButton />
    </form>
  );
};

export default AddToCartFormAction;