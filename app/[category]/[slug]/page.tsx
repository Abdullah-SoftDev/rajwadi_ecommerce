import { getProduct } from "@/repositories/productRepository/serversideFunctions";
import ImageGallery from "./components/ImageGallery";
import RecommendedProductSlider from "./components/RecommendedProductSlider";
import SizePicker from "./components/SizePicker";

interface Props {
  params: { slug: string; category: string };
}

export default async function Page({ params }: Props) {
  const { slug, category } = params;
  const product = await getProduct(slug);
  const { productName, productDescription, price, productImages, sizes } = product;
  const descArray = productDescription.split(",");

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
        <ImageGallery productImages={productImages} />
        {/* Product info */}
        <div>
          <div>
            <p className="text-md text-gray-900 capitalize">{category}</p>
          </div>
          <div className="w-full justify-between flex items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-3">
              {productName}
            </h1>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 pt-3">
              ₹{price}
            </h1>
          </div>
          <div className="pt-3 flex flex-col justify-between">
            <div>
              <ul className="list-disc pl-6 text-base text-gray-700 space-y-1 h-[fit-content] max-h-[10.3rem] overflow-y-auto">
                {descArray?.map((desc, index) => (
                  <li key={index} className="text-[1rem]">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
            <SizePicker sizes={sizes} product={product} />
          </div>
        </div>
      </div>
      <RecommendedProductSlider slug={slug} category={category} />
    </div>
  );
}