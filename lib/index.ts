import { TCartData } from "@/types/typescript.types";
import { User } from "firebase/auth";
import { toast } from "react-toastify";

// Function that handel checkout functionality in our application
export const createCheckout = async (user: User, requestData: { cartData: TCartData[] }) => {

  const data = await fetch(`/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userCartdata: requestData.cartData,
      uid: user.uid
    }),
  });

  if (!data.ok) {
    return toast.error("Failed to create order");
  }

  const { url } = await data.json();
  window.location.href = url;
};
