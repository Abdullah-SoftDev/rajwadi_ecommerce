import { experimental_useFormStatus as useFormStatus } from "react-dom";

const AddToCartButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`flex-none bg-purple-500  border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#bf86da] ${
        pending
          ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
          : ""
      }`}
      disabled={pending}
    >
      {pending ? "Adding....." : "Add to bag"}
    </button>
  );
};

export default AddToCartButton;