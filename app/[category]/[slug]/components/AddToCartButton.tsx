'use client'

const AddToCartButton = () => {
    const cartItemDoc = true;
    const addToCart = async () => {
        try {
            console.log("Add to Cart Button")
        } catch (error) {
            alert(error);
        }
    }

    const removeFromCart = async () => {
        try {
            console.log("Remove Button")
        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div>
            {!cartItemDoc ? (
                <button
                    onClick={addToCart}
                    type="button"
                    className="max-w-sm flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                    Add to bag
                </button>
            ) : (
                <button
                    onClick={removeFromCart}
                    type="button"
                    className="max-w-sm flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                >
                    Remove from bag
                </button>
            )}
        </div>
    );
}

export default AddToCartButton;