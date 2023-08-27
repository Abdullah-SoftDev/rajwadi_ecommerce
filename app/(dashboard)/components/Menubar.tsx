import Link from "next/link";
import React from "react";
const names = [
    { name: "Add product", path: "/addProduct" },
    { name: "Recent orders", path: "/recentOrders" },
    { name: "Veiw all products", path: "/viewAllProducts" },
    { name: "Banner images", path: "/addBannerImages" },
    { name: "Our customers", path: "/ourCustomers" },
];

const Menubar = () => {
    return (
        <>
            <nav className="mx-auto max-w-6xl flex p-4 text-xl overflow-x-auto whitespace-nowrap space-x-6">
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