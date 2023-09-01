import { experimental_useFormStatus as useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();

  return (
    <button
    className="text-purple-600 hover:text-purple-900"
    disabled={pending}
  >
    {pending ? "Deleting..." : "Delete"}
  </button>  
  )
}

export default Button