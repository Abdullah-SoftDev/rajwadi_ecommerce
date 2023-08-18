'use client'
import { handleSubmitBannerImage } from "@/app/actions";
import { useState } from "react";

const files = [
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    // More files...
]

const page = () => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setloading] = useState(false)
    const handelImageSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();

        if (e.target.files && e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            const result = readerEvent?.target?.result;
            if (typeof result === "string") {
                setImage(result);
            }
        };
    }

    const bannerImageUpload = async () => {
        if (!image) return;
        setloading(true)
        await handleSubmitBannerImage(image!)
        setloading(false)
        setImage(null)
    };

    return (
        <section className="mx-auto max-w-6xl px-4 pb-4">
            {/* Upload Image Section */}
            <div className="space-y-6 py-9">
                <div className="max-w-xl mx-auto justify-center items-center">
                    {image ? <div onClick={() => { setImage(null) }} className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 cursor-pointer focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={image} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                    </div> :
                        <div>
                            <label
                                htmlFor="fileUpload"
                                className="block text-sm font-medium text-gray-700">
                                Product Images
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="fileUpload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input
                                                onChange={handelImageSelect}
                                                id="fileUpload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="max-w-xl mx-auto justify-center items-center">
                    <button
                        onClick={bannerImageUpload}
                        className={`flex items-center justify-center w-full py-3 rounded-md bg-rose-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${loading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </div>
            </div>
            {/* Images Section */}
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {files.map((file) => (
                    <li key={file.source} className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                            <img src={file.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                        </div>
                        <button type="button" className="mt-2 block bg-gray-900 w-full p-2 rounded-lg  font-medium text-white hover:bg-gray-700 focus:outline-none">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default page