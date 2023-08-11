import AddToCartButton from "./components/AddToCartButton";
import BuyNowButton from "./components/BuyNowButton";
import ImageGallery from "./components/ImageGallery";
import RecommendedProductSlider from "./components/RecommendedProductSlider";
import ServiceForm from "./components/ServiceForm";

export default async function Page({ params }: { params: { slug: string, category: string } }) {
    const { slug, category } = params;

    return (
        <div className="mx-auto max-w-6xl px-4 pt-6">
            <div className="lg:grid lg:grid-cols-2 lg:space-x-8">
                {/* Image gallery */}
                <ImageGallery />
                {/* Product info */}
                <div>
                    <div>
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-xl text-gray-900 capitalize">{category}</p>
                    </div>
                    <div className="w-full justify-between flex items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-3">
                            Apple Airpod
                        </h1>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 pt-3">
                            $120
                        </h1>
                    </div>
                    <div className="mt-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-medium tracking-tight">Product Description</h3>
                            <ul className="list-disc pl-6 text-base text-gray-700 space-y-1 pt-1 h-[fit-content] max-h-[10.3rem] overflow-y-auto">
                                <li>Ultra Like Alloy Body</li>
                                <li>49mm full HD Display</li>
                                <li>Always on Display</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                                <li>Set your Own D.p.</li>
                            </ul>
                        </div>
                        <ServiceForm />
                        <div className="mt-8 space-x-5 flex sm:flex-col1 items-center">
                            <AddToCartButton />
                            <BuyNowButton />
                        </div>
                    </div>
                </div>
            </div>
            <RecommendedProductSlider />
        </div>
    )
}