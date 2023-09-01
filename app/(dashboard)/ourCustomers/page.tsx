import { CustomerTabelHeader } from "@/constants";
import { getAllUsers } from "@/repositories/productRepository/serversideFunctions";
import { User } from "firebase/auth";

const Page = async () => {
  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="sm:flex sm:items-center pb-4">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Our Customers</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all our customers.
          </p>
        </div>
      </div>
      <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <Tabel users={users} />
      </div>
    </div>
  );
};

export default Page;

function Tabel({ users }: { users: User[] }) {
    return (
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {CustomerTabelHeader.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users?.map((person, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    {person && person.photoURL && (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={person?.photoURL}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {person.displayName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="text-gray-500">{person.email ?? "No Email"}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}