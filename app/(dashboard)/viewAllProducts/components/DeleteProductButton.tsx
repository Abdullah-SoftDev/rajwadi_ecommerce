"use client";
import { handleDeleteProduct } from "@/app/actions";
import { useRouter } from "next/navigation";
import Button from "./Button";

const DeleteProductButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const deleteProduct = async () => {
    const shouldDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      await handleDeleteProduct(slug);
      router.refresh();
    }
  };

  return (
    <form action={deleteProduct}>
     <Button/>
    </form>
  );
};

export default DeleteProductButton;