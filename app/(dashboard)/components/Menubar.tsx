import { adminNavigation } from "@/constants";
import Link from "next/link";

const Menubar = () => {
  return (
    <div className="overflow-x-auto">
      <nav className="mx-auto max-w-6xl flex p-4 text-sm whitespace-nowrap space-x-6 overflow-x-auto">
        {adminNavigation.map((item, index) => (
          <Link href={item.path} key={index} className="cursor-pointer">
            <span
              className={`inline-flex items-center px-5 py-2 rounded-full font-semibold bg-[#111] text-white`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Menubar;
