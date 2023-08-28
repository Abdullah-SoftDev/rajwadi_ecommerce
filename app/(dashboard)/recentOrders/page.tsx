// import { getRecentOrders } from "@/repositories/productRepository/serversideFunctions";
import { getOnlineOrders, getOfflineOrders } from "@/repositories/productRepository/serversideFunctions";
import DeliveredButton from "./components/DeliveredButton";
import { TOnlineOrder, TOfflineOrder } from "@/types/typescript.types";

const RecentOrders = async () => {
    // const recentOrdersList = await getRecentOrders();
    const ordersListOnline = await getOnlineOrders();
    const ordersListOffline = await getOfflineOrders();

    const recentOrdersList: (any)[] = [...ordersListOnline, ...ordersListOffline];
    
    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Recent Orders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the recent orders.
                    </p>
                </div>
            </div>
            <div className="mt-4 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Payment or Order ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
    {recentOrdersList?.map((person) => {
        return (
            <tr key={person.id}>
                <td className="whitespace-nowrap py-4 pr-3 text-sm">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="font-medium text-gray-900">
                                {person.name}
                            </div>
                            <div className="text-gray-500">{person.email}</div>
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="text-gray-500">₹{person.amount}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {person.paymentId ?? person.orderId}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DeliveredButton id={person.id}/>
                </td>
            </tr>
        );
    })}
</tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentOrders;
