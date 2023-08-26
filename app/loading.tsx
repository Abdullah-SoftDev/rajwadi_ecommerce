import React from 'react'

const loading = () => {
    return (
        <div className='mx-auto max-w-6xl px-4 py-6'>
            <div className='grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {[...Array(10)].map(() => (
                    <div className="block mb-8">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <div className="animate-pulse bg-gray-300 w-full h-full" />
                    </div>
                    <div className="mt-2">
                        <div className="animate-pulse h-4 bg-gray-300 mb-1 w-3/4" />
                        <div className="animate-pulse h-3 bg-gray-300 w-1/4" />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default loading