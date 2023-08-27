import { TProduct } from "@/types/typescript.types"
import { BellAlertIcon } from "@heroicons/react/24/outline";
import Link from "next/link"

const ProductCard = ({ product }: { product: TProduct }) => {
    const { productImages, productName, price, category, slug } = product;
    return (
        <Link href={`/${category}/${slug}`} className="block mb-8">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative group">
                <div className="group">
                    <img
                        src={productImages[0]}
                        alt={productName}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/60 rounded-full w-8 h-8 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-lg font-semibold">{productName}</h3>
                <p className="text-gray-600">₹{price}</p>
            </div>
        </Link>
    )
}

export default ProductCard