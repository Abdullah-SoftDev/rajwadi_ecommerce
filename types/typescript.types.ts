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
  id: string,
  bannerUrl: string
}

export type CartItem = {
  id: string,
  productName: string;
  slug: string;
  productDescription: string;
  productImages: string[];
  price: number;
  category: string;
  selectedSize: string;
  createdAt?: Timestamp;
  quantity: number
}

export type OrderItem = {
  productImage: string[];
  productName: string;
  quantity: number;
  selectedSize: string;
};

export type Order = {
  amount: number;
  createdAt?: Timestamp;
  currency: string;
  email: string;
  name: string;
  orderItems: OrderItem[];
  paymentId: string;
  userId: string;
};
