'use client'
import { db } from "@/firebase/firebaseConfig"
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"


const DeliveredButton = async ({ id }: { id: string }) => {
    const [loading, setloading] = useState(false)
    const router = useRouter()

    async function handelProductDelivered(e: FormEvent, id: string) {
        e.preventDefault()
        setloading(true)
        // Check if the document exists in 'offers' collection
        const offersRef = doc(db, 'orders', id);
        const offersDoc = await getDoc(offersRef);

        if (offersDoc.exists()) {
            await deleteDoc(offersRef);
            console.log('Document deleted from "offers" collection');
        }

        // Check if the document exists in 'offlineOffers' collection
        const offlineOffersRef = doc(db, 'offlineOrders', id);
        const offlineOffersDoc = await getDoc(offlineOffersRef);

        if (offlineOffersDoc.exists()) {
            await deleteDoc(offlineOffersRef);
            console.log('Document deleted from "offlineOffers" collection');
        }
        router.refresh()
        setloading(false)
    }

    return (
        <>
            <form onSubmit={(e) => { handelProductDelivered(e, id) }}
                className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center ${loading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}>
                <button type="submit">
                    {loading ? "Updating..." : "Delivered"}
                </button>
            </form>
        </>
    )
}

export default DeliveredButton