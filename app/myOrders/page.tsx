import { getMyOrders } from "@/repositories/productRepository/serversideFunctions";
import { Order, OrderItem } from "@/types/typescript.types";
import Link from "next/link";

type Props = {
    searchParams: { [username: string]: string };
};

const Page = async ({ searchParams }: Props) => {
    const { uid } = searchParams;
    const ordersList = await getMyOrders(uid);

    return (
        <div className="mx-auto max-w-5xl px-2 py-14 min-h-screen">
            <div className="max-w-xl">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Check the status of recent orders, manage returns, and download invoices.
                </p>
            </div>

            <div className="mt-16">
                {ordersList ?
                    <div className="space-y-20">
                        {ordersList?.map((order: Order, index: number) => (
                            <div key={index}>
                                <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                        <div className="flex justify-between sm:block">
                                            <dt className="font-medium text-gray-900">Date placed</dt>
                                            <dd className="sm:mt-1">
                                                <time>{new Date(order?.createdAt?.seconds! * 1000).toDateString()}</time>
                                            </dd>

                                        </div>
                                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                            <dt className="font-medium text-gray-900">Order ID</dt>
                                            <dd className="sm:mt-1">{order.paymentId}</dd>
                                        </div>

                                    </dl>
                                    <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                        <dt>Total amount</dt>
                                        <dd className="sm:mt-1">₹{order.amount}</dd>
                                    </div>
                                </div>

                                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                    <caption className="sr-only">Products</caption>
                                    <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                        <tr>
                                            <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                                                Product
                                            </th>
                                            <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                                                Price
                                            </th>
                                            <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                                                Quantity
                                            </th>
                                            <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                                                Size
                                            </th>
                                            <th scope="col" className="w-0 py-3 font-normal text-right">
                                                Info
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                                        {order.orderItems?.map((product: OrderItem, index) => (
                                            <tr key={index}>
                                                <td className="py-6 pr-8">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={product.productImage[0]}
                                                            alt={product.productName}
                                                            className="w-16 h-16 object-center object-cover rounded mr-6"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{product.productName}</div>
                                                            <div className="mt-1 sm:hidden">{product.price}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">₹ {product.price}</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{product.selectedSize}</td>
                                                <td className="py-6 font-medium text-right whitespace-nowrap">
                                                    <Link href={`/${product.category}/${product.slug}`} className="text-indigo-600">
                                                        View<span className="hidden lg:inline"> Product</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div> : <div className="h-96 flex">
                        <h2 className="text-xl text-red-500 m-auto">
                            No products available at the moment.
                        </h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Page