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
    quantity?: number
}

export type BannerImage = {
  id:string,
  bannerUrl:string
}

export type CartItem = {
  id:string,
  productName: string;
  slug: string;
  productDescription: string;
  productImages: string[];
  price: number;
  category: string;
  size: string;
  createdAt?: Timestamp;
  quantity: number
}