import { Product } from '@/types/typescript.types'
import Link from 'next/link';

const RecommendProductCard = ({ product }: { product: Product }) => {
    const { productImages, productName, price, category, slug } = product;
    return (
        <Link href={`/${category}/${slug}`} className="block mb-8">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <div className="group">
                    <img
                        src={String(productImages[0])}
                        alt={productName}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                    />
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-lg font-semibold">{productName}</h3>
                <p className="text-gray-600">{price}</p>
            </div>
        </Link>)
}

export default RecommendProductCard