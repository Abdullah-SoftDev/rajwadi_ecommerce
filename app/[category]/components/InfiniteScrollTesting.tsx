'use client'
import ProductCard from "@/components/ProductCard"
import { db } from "@/firebase/firebaseConfig"
import { TProduct } from "@/types/typescript.types"
import { query, orderBy, collection, startAfter, getDocs, where, Timestamp, limit } from "firebase/firestore"
import { useState } from "react"

const InfiniteScrollTesting = ({ productsList, category }: { productsList: TProduct[], category: string }) => {
    const [data, setdata] = useState(productsList)
    const [loading, setLoading] = useState(false)
    const [postEnd, setPostEnd] = useState(false)

    const getMorePosts = async () => {
        setLoading(true)
        const last = productsList[productsList.length - 1]
        const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;
        const productsRef = collection(db, 'products');
        const q = await getDocs(query(productsRef,
            where('category', '==', category),
            orderBy('createdAt',"desc"),
            limit(1),
            startAfter(cursor)
        ));
        const products: TProduct[] = q.docs.map((doc) =>
            doc.data() as TProduct
        );
        setdata(data.concat(products));
        setLoading(false)
        if (products.length < 1) {
            setPostEnd(true)
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {data.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            {!loading && !postEnd && <button onClick={getMorePosts}>Load More</button>}
                {loading && <p>Loading....</p>}
                {postEnd && <p>Content End</p>}
        </>
    )
}

export default InfiniteScrollTesting