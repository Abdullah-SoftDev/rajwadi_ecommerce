'use client'

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const Searchbar = () => {
  const [search, setsearch] = useState("");
  const router = useRouter();

  const handelSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!search || !search?.trim()) return;
    router.push(`/results?search_query=${search}`);
  };

  // Trigger the search when the Enter key is pressed
  const handleKeyDown = (e: any) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      handelSearch(e);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-2 py-6">
      <div className="max-w-xl w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative flex items-center">
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            onKeyDown={handleKeyDown}
            name="search"
            className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search products..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {search && (
              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setsearch("")}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={handelSearch}
              className="text-[#111] hover:text-[#111] focus:outline-none"
            >
              <MagnifyingGlassIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;