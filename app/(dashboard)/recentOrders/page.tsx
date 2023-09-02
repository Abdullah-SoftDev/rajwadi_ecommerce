import {
    getOnlineOrders,
    getOfflineOrders,
  } from "@/repositories/productRepository/serversideFunctions";
  import DeliveredButton from "./components/DeliveredButton";
  import { TOnlineOrder, TOfflineOrder } from "@/types/typescript.types";
  import { recentOrderTabelHeader } from "@/constants";
  
  const RecentOrders = async () => {
    const ordersListOnline = await getOnlineOrders();
    const ordersListOffline = await getOfflineOrders();
  
    const recentOrdersList: (TOnlineOrder | TOfflineOrder)[] = [
      ...ordersListOnline,
      ...ordersListOffline,
    ];
  
    return (
      <div className="mx-auto max-w-6xl p-4">
        <div className="sm:flex sm:items-center pb-4">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Recent Orders</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the recent orders.
            </p>
          </div>
        </div>
        <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <Tabel recentOrdersList={recentOrdersList} />
        </div>
      </div>
    );
  };
  
  export default RecentOrders;
  
  function Tabel({
    recentOrdersList,
  }: {
    recentOrdersList: (TOnlineOrder | TOfflineOrder)[];
  }) {
    return (
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {recentOrderTabelHeader.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="py-3.5  pr-3 text-left text-sm font-semibold text-gray-900 pl-3"
              >
                {item}
              </th>
            ))}
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
                  {"paymentId" in person ? (
                    <>{person.paymentId}</>
                  ) : (
                    <>{person.orderId}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="text-gray-500">{person.type}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <DeliveredButton id={person.id!} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }  