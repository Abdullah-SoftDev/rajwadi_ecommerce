'use client'
import { deliveredOrder } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeliveredButton = async ({ id }: { id: string }) => {
    const [loading, setloading] = useState(false)
    const router = useRouter()

    const handelDeliveredOrder = async () => {
        setloading(true)
        await deliveredOrder(id)
        router.refresh()
        setloading(false)
    }

    return (
        <>
            <form action={handelDeliveredOrder}>
                <button
                    type="submit"
                    className={`flex-none bg-purple-500  border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 ${loading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Delivering..." : "Delivered"}
                </button>
            </form>
        </>
    )
}

export default DeliveredButton