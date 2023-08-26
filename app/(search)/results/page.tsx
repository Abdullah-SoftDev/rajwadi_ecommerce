'use client'

import React, { useEffect, useState } from "react";
import { TProduct } from "@/types/typescript.types";
import ProductCard from "@/components/ProductCard";
import NotFound from "@/components/NotFound";
import { handelSearch } from "@/app/actions";

type Props = {
  searchParams: { search_query: string };
}

const Page = ({ searchParams }: Props) => {
  const searchQuery = searchParams?.search_query;
  const [searchResults, setSearchResults] = useState<TProduct[]>([]);

  const fetchSearchResultsData = async () => {
    if (searchQuery) {
      const results = await handelSearch(searchQuery);
      setSearchResults(results!);
    }
  };

  useEffect(() => {
    fetchSearchResultsData();
  }, [searchQuery]);

  if (!searchQuery) {
    return <NotFound />
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl pb-2">Search Results</h1>
      {searchResults?.length === 0 ? (
        <div className="h-96 flex">
          <h2 className="text-xl text-red-500 m-auto">
            No products available at the moment.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {searchResults?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
