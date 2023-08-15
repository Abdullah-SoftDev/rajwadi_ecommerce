import { Timestamp } from "firebase/firestore";

export type MobileNavigationProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

  export type CartProps = {
    cartOpen: boolean;
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

  export type Product = {
    productName: string;
    slug: string;
    productDescription: string;
    productImages: (string | File)[];
    price: string | number;
    category: string;
    sizes: string[];
    stockAvailable: boolean;
    createdAt?: Timestamp;
}