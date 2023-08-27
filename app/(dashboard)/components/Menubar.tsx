import Link from "next/link";

const names = [
    { name: "Add product", path: "/addProduct"},
    { name: "Recent orders", path: "/recentOrders"},
    { name: "View all products", path: "/viewAllProducts"},
    { name: "Banner images", path: "/addBannerImages"},
    { name: "Our customers", path: "/ourCustomers"},
];

const Menubar = () => {
    return (
        <div className="overflow-x-auto">
            <nav className="mx-auto max-w-6xl flex p-4 text-md whitespace-nowrap space-x-6 overflow-x-auto">
                {names.map((item, index) => (
                    <Link href={item.path} key={index} className="cursor-pointer">
                        <span className={`inline-flex items-center px-4 py-1 rounded-full font-semibold bg-[#111] text-white`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Menubar;
