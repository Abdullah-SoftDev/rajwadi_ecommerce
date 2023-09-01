import { experimental_useFormStatus as useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`flex items-center justify-center w-full py-3 rounded-full bg-purple-500 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ${
        pending
          ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
          : ""
      }`}
      disabled={pending}
    >
      {pending ? "Uploading..." : "Upload Image"}
    </button>
  );
};

export default Button;