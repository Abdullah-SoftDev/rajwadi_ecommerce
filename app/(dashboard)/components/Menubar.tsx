import Link from "next/link";

const names = [
    { name: "Add product", path: "/addProduct", color: "bg-blue-100" },
    { name: "Recent orders", path: "/recentOrders", color: "bg-green-100" },
    { name: "View all products", path: "/viewAllProducts", color: "bg-yellow-100" },
    { name: "Banner images", path: "/addBannerImages", color: "bg-red-100" },
    { name: "Our customers", path: "/ourCustomers", color: "bg-purple-100" },
];

const Menubar = () => {
    return (
        <div className="overflow-x-auto">
            <nav className="mx-auto max-w-6xl flex p-4 text-xl whitespace-nowrap space-x-6 overflow-x-auto">
                {names.map((item, index) => (
                    <Link href={item.path} key={index} className="cursor-pointer">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${item.color} text-purple-700 hover:text-gray-700`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Menubar;
