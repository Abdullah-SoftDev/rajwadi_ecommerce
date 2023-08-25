import { TBannerImage } from "@/types/typescript.types";
import DeleteButton from "./DeleteButton";

const ImageComponent = ({ file }: { file: TBannerImage }) => {
    const { bannerUrl, id } = file;
    return (
        <li key={id} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src={bannerUrl} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
            </div>
            <DeleteButton id={id} />
        </li>
    )
}

export default ImageComponent