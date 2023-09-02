const Loading = () => {
  // Create a fake array with a specified number of fake items (e.g., 4 items)
  const fakeArray = Array.from({ length: 8 });

  // Map over the fake array and render the skeleton loaders for each item
  const skeletonLoaders = fakeArray.map((_, index) => (
    <div key={index} className="block mb-8">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
        <div className="animate-pulse">
          {/* Placeholder image */}
          <div className="h-full w-full bg-gray-400" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300">
          {/* Placeholder content */}
          <div className="w-full h-full bg-gray-300" />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">
          {/* Placeholder product name */}
          <div className="w-3/4 h-6 bg-gray-300 mb-2" />
        </h3>
        <p className="text-gray-600">
          {/* Placeholder price */}
          <div className="w-1/4 h-4 bg-gray-300" />
        </p>
      </div>
    </div>
  ));

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Skeleton loader for the heading */}
      <div className="md:flex">
        <div className="text-center text-xl capitalize mb-8">
          <div className="animate-pulse">
            <div className="font-semibold text-[#ca7dee] bg-gray-300 w-20 h-6 inline-block" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {skeletonLoaders}
      </div>
    </div>
  );
};

export default Loading;