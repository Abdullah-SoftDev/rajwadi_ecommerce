import Link from "next/link";
import React from "react";
const names = [
    { name: "AddProduct", path: "/addProduct" },
    { name: "ProductsDelivered", path: "/ourCustomers" },
    { name: "RecentOrders", path: "/recentOrders" },
    { name: "VeiwAllProducts", path: "/viewAllProducts" },
    { name: "BannerImages", path: "/addBannerImages" },
];

const Menubar = () => {
    return (
        <>
            <nav className="mx-auto max-w-6xl flex mt-4 px-4 text-xl overflow-x-auto whitespace-nowrap space-x-6">
                {names.map((item, index) => (
                    <Link href={item.path} key={index} className="cursor-pointer hover:text-purple-500">
                        {item.name}
                    </Link>
                ))}
            </nav>
        </>
    );
};

export default Menubar;