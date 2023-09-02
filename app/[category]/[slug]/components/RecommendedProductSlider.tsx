import React from "react";
import { getRecommendedProducts } from "@/repositories/productRepository/serversideFunctions";
import RecommendProductCard from "./RecommendProductCard";

const RecommendedProductSlider = async ({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) => {
  const recommendedProducts = await getRecommendedProducts(category, slug);

  return (
    <div className="pt-10">
      {recommendedProducts.length > 0 && (
        <>
          <h2 className="text-center text-3xl">Recommended Products</h2>
          <div className="mt-8 relative">
            <div className="overflow-x-scroll scrollbar-hide">
              <ul role="list" className="flex space-x-8">
                {recommendedProducts.map((product, index) => (
                  <li className="flex-shrink-0 w-64" key={index}>
                    <RecommendProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedProductSlider;