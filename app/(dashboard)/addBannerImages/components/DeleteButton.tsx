"use client";
import { db } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const DeleteButton = ({ id }: { id: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handelDeleteImage = async (id: string) => {
    const cartRef = doc(db, `bannerImages/${id}`);
    await deleteDoc(cartRef);
    router.refresh();
  };

  return (
    <button
      onClick={() => {
        handelDeleteImage(id);
      }}
      type="button"
      className={`mt-2 block bg-gray-900 w-full p-2 rounded-full font-medium text-white hover:bg-gray-700 focus:outline-none ${
        pending
          ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
          : ""
      }`}
      disabled={pending}
    >
      {pending ? "Deleting.." : "Delete"}
    </button>
  );
};

export default DeleteButton;
