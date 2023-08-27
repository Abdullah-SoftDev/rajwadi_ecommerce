'use client'
import { db } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ id }: { id: string }) => {
    const router = useRouter()
    const [loading, setloading] = useState(false)

    const handelDeleteImage = async (id: string) => {
        setloading(true)
        const cartRef = doc(db, `bannerImages/${id}`);
        await deleteDoc(cartRef);
        setloading(false)
        router.refresh()
    }

    return (
        <button onClick={() => { handelDeleteImage(id) }} type="button" className={`mt-2 block bg-gray-900 w-full p-2 rounded-full font-medium text-white hover:bg-gray-700 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}>
            {loading ? "Deleting.." : "Delete"}
        </button>
    )
}

export default DeleteButton