import React from "react";
import Link from "next/link";

const RecommendedProductSlider = () => {
    const dummyProducts = [
        {
            imageSrc:
                "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/dOyXoEjc.webp",
            altText: "airpods",
            heading: "Airpod",
            href: "/airpod/1",
            title: "Premium Airpods",
            price: "$199.99",
        },
        {
            imageSrc:
                "https://firebasestorage.googleapis.com/v0/b/abdsiddecom.appspot.com/o/images%2F1689461847%2FunevXJmJ.jpeg?alt=media&token=a18d64a7-441d-47b8-9b27-61aee6c2e854",
            altText: "tshirts",
            heading: "Tshirts",
            href: "/tshirts/1",
            title: "Trendy Tshirts",
            price: "$29.99",
        },
        {
            imageSrc:
                "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/1An0xNDS.webp",
            altText: "iwatch",
            heading: "Iwatch",
            href: "/iwatch/1",
            title: "Smart Iwatch",
            price: "$349.99",
        },
        {
            imageSrc:
                "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/dOyXoEjc.webp",
            altText: "airpods",
            heading: "Airpod",
            href: "/airpod/1",
            title: "Premium Airpods",
            price: "$199.99",
        },
        {
            imageSrc:
                "https://firebasestorage.googleapis.com/v0/b/abdsiddecom.appspot.com/o/images%2F1689461847%2FunevXJmJ.jpeg?alt=media&token=a18d64a7-441d-47b8-9b27-61aee6c2e854",
            altText: "tshirts",
            heading: "Tshirts",
            href: "/tshirts/1",
            title: "Trendy Tshirts",
            price: "$29.99",
        },
        {
            imageSrc:
                "https://cdn.dotpe.in/longtail/item_thumbnails/1293287/1An0xNDS.webp",
            altText: "iwatch",
            heading: "Iwatch",
            href: "/iwatch/1",
            title: "Smart Iwatch",
            price: "$349.99",
        },
    ];

    return (
        <div className="pt-10">
            <h2 className="text-center text-3xl">Recommended Products⚡</h2>
            <div className="mt-8 relative">
                <div className="overflow-x-scroll scrollbar-hide">
                    <ul
                        role="list"
                        className="flex space-x-8"
                        style={{ width: `${dummyProducts.length * 280}px` }}>
                        {dummyProducts.map((product, index) => (
                            <li key={product.href} className="flex-shrink-0 w-64">
                                <Link key={index} href={product.href} className="block mb-8">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <div className="group">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.altText}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transform transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <h3 className="text-lg font-semibold">{product.title}</h3>
                                        <p className="text-gray-600">{product.price}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecommendedProductSlider;
