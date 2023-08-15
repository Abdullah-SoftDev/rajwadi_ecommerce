"use client";
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { Product } from '@/types/typescript.types';
import { handelSubmitForm, handleInputChange, handleImageClick, handleImageUpload, handleSizeToggle, handleStockAvailableChange, handleSubmitImage, cancelForm } from '@/repositories/productRepository';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const availableSizes = ["S", "M", "L", "XL"];

const Page = () => {
    const [data, setData] = useState<Product>({
        productName: "",
        slug: "",
        productDescription: "",
        productImages: [],
        price: "",
        category: "",
        sizes: [],
        stockAvailable: false
    })

    const [isPublishing, setIsPublishing] = useState<boolean>(false);
    const [isImgUpLoading, setIsImgUpLoading] = useState<boolean>(false);
    const [imguploaded, setIsImgUploaded] = useState<boolean>(false);

    return (
        <form onSubmit={(e) => handelSubmitForm(e, data, setData, setIsPublishing, setIsImgUploaded, imguploaded)} className="space-y-8 mx-auto max-w-5xl px-4 py-14">
            {/* Headings */}
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add Product Form
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful what you
                    share.
                </p>
            </div>
            {/* Form Inputs */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <div className="mt-1">
                        <input
                            onChange={(e) => handleInputChange(e, setData)}
                            value={data.productName}
                            type="text"
                            name="productName"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700">
                        Slug
                    </label>
                    <div className="mt-1">
                        <input
                            onChange={(e) => handleInputChange(e, setData)}
                            value={data.slug}
                            type="text"
                            name="slug"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700 pb-1">
                        Description (Use comma(,) to separate description points.)
                    </label>
                    <textarea
                        onChange={(e) => handleInputChange(e, setData)}
                        value={data.productDescription}
                        name="productDescription"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>

                {imguploaded ? <p className="text-red-500 sm:col-span-6">Images gets uploaded.</p>
                    :
                    <>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="fileUpload"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product Images
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                {data?.productImages?.length > 0 ? (
                                    <div className="space-y-1 text-center">
                                        {data?.productImages?.map((file, index) => (
                                            <p
                                                className="cursor-pointer"
                                                key={index}
                                                onClick={() => handleImageClick(index, setData)}
                                            >
                                                {typeof file === "string" ? file : (file as File).name}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="fileUpload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    className="sr-only"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, setData)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <button
                                onClick={() => {
                                    handleSubmitImage(data, setData, setIsImgUpLoading, setIsImgUploaded);
                                }}
                                type="button"
                                className={`flex items-center justify-center w-full py-3 rounded-md bg-rose-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${isImgUpLoading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
                                disabled={isImgUpLoading}
                            >
                                {isImgUpLoading ? "Uploading..." : "Upload Image"}
                            </button>

                        </div>
                    </>
                }

                <div className="sm:col-span-2">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <div className="mt-1">
                        <input
                            onChange={(e) => handleInputChange(e, setData)}
                            value={data.price}
                            type="number"
                            name="price"
                            autoComplete="family-name"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <div className="mt-1">
                        <select
                            onChange={(e) => handleInputChange(e, setData)}
                            value={data.category}
                            name="category"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                            <option value="Bride and Groom">Bride and Groom</option>
                            <option value="Saree">Saree</option>
                            <option value="Lehenga Choli">Lehenga Choli</option>
                            <option value="Salwar Kameez">Salwar Kameez</option>
                            <option value="Mens">Mens</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-700">
                        Sizes
                    </label>
                    <div className="mt-2 space-x-2">
                        {availableSizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${data?.sizes?.includes(size) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => handleSizeToggle(size, setData)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Switch Component */}
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                    <Switch
                        checked={data.stockAvailable}
                        onChange={(checked) => handleStockAvailableChange(checked, setData)}
                        className={classNames(
                            data.stockAvailable ? 'bg-indigo-600' : 'bg-gray-200',
                            'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        )}
                    >
                        <span className="sr-only">Agree to policies</span>
                        <span
                            aria-hidden="true"
                            className={classNames(
                                data.stockAvailable ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>
                <Switch.Label className="text-md leading-6 text-gray-600">
                    By selecting this, you agree that the product is available in stocks.
                </Switch.Label>
            </Switch.Group>
            {/* Buttons */}
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => { cancelForm(setData) }}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isPublishing ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`} disabled={isPublishing}>
                    {isPublishing ? "Publishing..." : "Publish"}
                </button>
            </div>
        </form>
    );
};

export default Page;