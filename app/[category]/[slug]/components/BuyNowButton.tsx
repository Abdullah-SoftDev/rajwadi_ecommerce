'use client'

const BuyNowButton = () => {
    const user = false;
    const createCheckout = async () => {
        if (!user) {
            alert('Please login first.');
            return;
        }
        console.log("Buy Now Button")
    };

    return (
        <>
            <button
                type="button"
                onClick={createCheckout}
                className="flex-none bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                Buy Now
            </button>
        </>
    )
}

export default BuyNowButton