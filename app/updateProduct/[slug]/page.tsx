import { getProduct } from "@/repositories/productRepository/serversideFunctions";
import UpdateForm from "./components/UpdateForm";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const product = await getProduct(slug);
  return (
    <>
      <UpdateForm product={product} />
    </>
  );
};

export default Page;