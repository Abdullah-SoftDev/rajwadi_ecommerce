import { getBannerImages } from "@/repositories/productRepository/serversideFunctions";
import ImageComponent from "./components/ImageComponent";
import UploadInputImage from "./components/UploadInputImage";

const page = async () => {
    const bannerImageList = await getBannerImages();

    return (
        <section className="mx-auto max-w-6xl px-4 pb-4">
            <UploadInputImage />
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {bannerImageList?.map((file, index) =>
                    <ImageComponent key={index} file={file} />
                )}
            </ul>
        </section>
    )
}

export default page