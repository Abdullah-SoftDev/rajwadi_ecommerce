'use client'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { TProduct } from '@/types/typescript.types'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SizePicker({ sizes, product }: { sizes: string[], product: TProduct }) {
    const [selectedSize, setSelectedSize] = useState<string>(sizes[0])

    return (
        <>
            <RadioGroup className="pt-3" value={selectedSize} onChange={setSelectedSize}>
                <RadioGroup.Label className="block text-xl font-medium text-gray-700">Choose a size</RadioGroup.Label>
                <div className="mt-4 flex items-center space-x-3">
                    {sizes.map((size, index) => (
                        <RadioGroup.Option
                            key={index}
                            value={size}
                            className={({ checked }) =>
                                classNames(
                                    checked ? 'bg-[#bf86da]  text-white' : 'bg-gray-300 text-gray-700', '-m-0.5 relative p-2 rounded-full flex items-center justify-center cursor-pointer focus:outline-none h-8 w-8')}>
                            {size}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <div className="pt-6 space-x-5 flex items-center">
                <AddToCartButton product={product} selectedSize={selectedSize} />
                <BuyNowButton product={product} selectedSize={selectedSize}/>
            </div>
        </>
    )
}

