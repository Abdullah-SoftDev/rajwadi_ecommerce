import Link from "next/link";

const MenuCategory = ({ title, items }: { title: string, items: string[] }) => {
  return (
    <div className="lg:w-1/4 w-full">
      <h2 className="title-font font-medium text-gray-900 tracking-widest text-md mb-3">
        {title}
      </h2>
      <nav className="list-none mb-10">
        {items.map((item, index) => (
          <li key={index}>
            <a className="text-gray-600 hover:text-gray-800 text-sm">{item}</a>
          </li>
        ))}
      </nav>
    </div>
  );
};

const Footer: React.FC = () => {
  const womensItems: string[] = ['Bride and Groom', 'Saree', 'Lehenga Choli'];
  const mensItems: string[] = ['Mens', 'Kids'];
  const othersItems: string[] = ['Privacy Policy', 'Terms', 'How delivery works'];

  return (
    <footer className="text-gray-600 body-font bg-zinc-100">
      <div className="container mx-auto px-4 py-14 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center">
          <h1 className="flex title-font font-medium items-center justify-center text-gray-900 text-2xl">
            Navkar Selection
          </h1>
          <p className="mt-2 text-sm text-gray-500">Your clothing fashion company</p>
        </div>
        <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 mt-10  text-center justify-end">
          <MenuCategory title="WOMENS" items={womensItems} />
          <MenuCategory title="MENS" items={mensItems} />
          <MenuCategory title="OTHERS" items={othersItems} />
          <MenuCategory title="OTHERS" items={othersItems} />
        </div>
      </div>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 All Rights Reserved by Navkar Selection —{' '}
            <Link href="/" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
              created by cyper studio
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start space-x-4">
            <Link href="/" className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </Link>
            <Link href="/" className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </Link>
            <Link href="/" className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </Link>
          </span>
        </div>
    </footer>
  );
};

export default Footer;
