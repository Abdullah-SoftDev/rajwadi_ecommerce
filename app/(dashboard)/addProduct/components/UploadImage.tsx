import { handelSubmitProductFormImgs } from "@/app/actions";
import { handleImageClick, handleImageUpload } from "@/repositories/productRepository/clientsideFunctions";
import {  TProduct, TUploadImage } from "@/types/typescript.types";
import { useState } from "react";

const UploadImage = ({ imguploaded, data, setData, setIsImgUploaded }: TUploadImage) => {
  const [isImgUpLoading, setIsImgUpLoading] = useState<boolean>(false);

  const submitImage = async () => {
    if (data.productImages.length === 0) return;
    setIsImgUpLoading(true);
    const downloadURLs = await handelSubmitProductFormImgs(data)
    setData((prevData: TProduct) => ({
      ...prevData,
      productImages: downloadURLs,
    }));
    setIsImgUploaded(true);
    setIsImgUpLoading(false);
  };

  return (
    <>
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
                <div className="grid grid-cols-3 gap-4">
                  {data?.productImages?.map((image, index) => (
                    <div
                      className="cursor-pointer relative rounded overflow-hidden"
                      key={index}
                      onClick={() => handleImageClick(index, setData)}
                    >

                      <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover" />

                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                        <span className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          Click to Remove
                        </span>
                      </div>
                    </div>
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
              onClick={submitImage}
              type="button"
              className={`flex items-center justify-center w-full py-3 rounded-md bg-purple-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${isImgUpLoading ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
              disabled={isImgUpLoading}
            >
              {isImgUpLoading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </>
      }
    </>
  )
}

export default UploadImage