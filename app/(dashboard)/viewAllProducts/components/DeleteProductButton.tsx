'use client'

import { db } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteProductButton = ({ slug }: { slug: string }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const handleDeleteProduct = async (slug: string) => {
        const shouldDelete = confirm('Are you sure you want to delete this product?');
        if (shouldDelete) {
            setLoading(true)
            const productRef = doc(db, `products/${slug}`);
            await deleteDoc(productRef);
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <button
            onClick={() => handleDeleteProduct(slug)}
            className="text-indigo-600 hover:text-indigo-900"
            disabled={loading}
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    )
}

export default DeleteProductButton