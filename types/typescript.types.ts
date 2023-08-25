import { Timestamp } from "firebase/firestore";

export type TCart = {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TProduct = {
  productName: string;
  slug: string;
  productDescription: string;
  productImages: string[];
  price: string | number;
  category: string;
  sizes: string[];
  stockAvailable: boolean;
  createdAt?: Timestamp;
  quantity?: number
}

export type TBannerImage = {
  id: string,
  bannerUrl: string
}

export type TCartItem = {
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

export type TOrderItem = {
  category: string;
  price: number;
  productImages: string[];
  productName: string;
  quantity: number;
  selectedSize: string;
  slug: string;
};

export type TOnlineOrder = {
  amount: number;
  createdAt?: Timestamp;
  email: string;
  name: string;
  orderItems: TOrderItem[];
  paymentId: string;
  userId: string;
};

export type TOfflineOrder = {
  address: string;
  amount: number;
  city: string;
  createdAt?: Timestamp;
  email: string;
  name: string;
  orderId: string;
  orderItems: TOrderItem[];
  phonenumber: string;
  pincode: string;
  state: string;
  userId: string;
};

export type TUploadImage = {
  imguploaded: boolean;
  data: TProduct;
  setData: React.Dispatch<React.SetStateAction<TProduct>>;
  setIsImgUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TUpdateProduct = {
  productName: string;
  productDescription: string;
  productImages: string[];
  price: string | number;
  category: string;
  sizes: string[];
  stockAvailable: boolean;
  createdAt?: Timestamp;
  quantity?: number
}

export type TCheckoutForm = {
  email: string,
  name: string,
  phonenumber: string,
  address: string,
}
