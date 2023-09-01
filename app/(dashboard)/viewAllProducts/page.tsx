import { viewAllProducts } from "@/repositories/productRepository/serversideFunctions";
import Link from "next/link";
import DeleteProductButton from "./components/DeleteProductButton";
import { TProduct } from "@/types/typescript.types";
import { viewAllProductsTabelHeader } from "@/constants";

const Page = async () => {
  const productsList = await viewAllProducts();

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="sm:flex sm:items-center pb-4">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">All Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in your ecommece.
          </p>
        </div>
      </div>
      <div className="overflow-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <Tabel productsList={productsList} />
      </div>
    </div>
  );
};

export default Page;

function Tabel({ productsList }: { productsList: TProduct[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {viewAllProductsTabelHeader.map((item, index) => (
            <th
              key={index}
              scope="col"
              className="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {productsList.map((product, index) => {
          const { productName, category, price, stockAvailable, slug } = product;

          return (
            <tr key={index}>
              <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-500">
                {productName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {category}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {price}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {stockAvailable ? "True" : "False"}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                <Link
                  href={`/updateProduct/${slug}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                <DeleteProductButton slug={slug} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}