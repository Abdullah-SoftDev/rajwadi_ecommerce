import Link from "next/link";

export default function Page() {
  return (
    <>
     <main className="bg-white px-6 lg:px-8">
      <div className="text-center py-24">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 ">
          Congratulations! Your order is placed successfully.
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="/myOrders" label="See Order" />
          <Button href="/" label="Go back home" />
        </div>
      </div>
    </main>
    </>
  );
}

function Button({ href, label }:{ href:string, label:string }) {
  return (
    <Link href={href}
       className="rounded-full bg-purple-500 py-3 px-8 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
        {label}
    </Link>
  );
}