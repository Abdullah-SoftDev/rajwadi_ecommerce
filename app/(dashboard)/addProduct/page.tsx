"use client";

const Page = () => {
    const availableSizes = ["S", "M", "L", "XL"];
    return (
        <form className="space-y-8 mx-auto max-w-5xl px-4 py-14">
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
                        name="desc"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>

                <div className="sm:col-span-6">
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
                                        id="fileUpload"
                                        name="fileUpload"
                                        type="file"
                                        className="sr-only"
                                        multiple
                                        accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <button
                        type="button"
                        className={`flex items-center justify-center w-full py-3 rounded-md bg-rose-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600`} >
                        {/* {isLoading ? "Uploading..." : "Upload Image"} */}
                        Upload Image
                    </button>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <div className="mt-1">
                        <input
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
                            name="category"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                            <option value="">Select Category</option>
                            <option value="IWATCH ULTRA">IWATCH</option>
                            <option value="AIRPOD">AIRPOD</option>
                            <option value="T-SHIRTS">TSHIRTS</option>
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
                                className={`inline-flex items-center justify-center h-8 w-8 rounded-full border`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-center">
                <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                    Publish
                </button>
            </div>
        </form>
    );
};

export default Page;