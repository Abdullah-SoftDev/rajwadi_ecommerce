import { experimental_useFormStatus as useFormStatus } from "react-dom";

const PublishButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
          type="submit"
          className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
            pending
              ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
              : ""
          }`}
          disabled={pending}
        >
          {pending ? "Publishing.." : "Publish"}
        </button>
  )
}

export default PublishButton