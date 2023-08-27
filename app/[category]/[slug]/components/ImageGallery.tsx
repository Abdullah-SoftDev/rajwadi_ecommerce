"use client";
import { Tab } from "@headlessui/react";
import { useState } from "react";

const ImageGallery = ({productImages}:{productImages:(string | File)[]}) => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <Tab.Group as="div" className="flex flex-col-reverse lg:flex-row">
    <div className="w-full h-full py-4 lg:w-1/4 lg:h-auto lg:py-0">
      <Tab.List className="grid grid-cols-4 gap-6 lg:grid-cols-1">
        {productImages?.map((image, index) => (
          <Tab
            key={index}
            className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
              selectedImage === image ? "ring-indigo-500" : "ring-transparent"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <span className="sr-only">{String(image)}</span>
            <span className="absolute inset-0 rounded-md overflow-hidden">
              <img
                src={String(image)}
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </span>
            <span
              className={`absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none ${
                selectedImage === image
                  ? "ring-indigo-500"
                  : "ring-transparent"
              }`}
              aria-hidden="true"
            />
          </Tab>
        ))}
      </Tab.List>
    </div>
    <div className="w-full h-[60vh] lg:w-3/4 pl-0 lg:pl-3">
      <img
        src={String(selectedImage)}
        alt=""
        className="w-full h-full object-center object-cover rounded-md"
      />
    </div>
  </Tab.Group>  
  );
};

export default ImageGallery;
