import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Assuming you have session and metadata variables defined
    const images = JSON.parse(session?.metadata?.images!);
    const productNames = JSON.parse(session?.metadata?.productName!);
    const quantities = JSON.parse(session?.metadata?.quantity!);
    const selectedSizes = JSON.parse(session?.metadata?.selectedSize!);
    const price = JSON.parse(session?.metadata?.price!);
    const category = JSON.parse(session?.metadata?.category!);
    const slug = JSON.parse(session?.metadata?.slug!);

    // Additional fields
    const userId = session?.metadata?.userId;
    const paymentId = session.id;
    const amount = session?.amount_total! / 100;
    const email = session?.customer_details?.email;
    const name = session?.customer_details?.name;

    // Create an array of items for the order
    const orderItems = images.map((image: string, index: number) => {
      return {
        productImages: image,
        productName: productNames[index],
        quantity: quantities[index],
        selectedSize: selectedSizes[index],
        price: price[index],
        category: category[index],
        slug: slug[index],
      };
    });

    const batch = writeBatch(db);

    // Add the addDoc operation to the batch
    const orderRef = doc(collection(db, "orders"));
    batch.set(orderRef, {
      userId,
      paymentId,
      amount,
      createdAt: serverTimestamp(),
      email,
      name,
      orderItems,
    });

    // Add the deleteDoc operations to the batch
    const cartsRef = collection(db, `users/${userId}/cart`);
    const querySnapshot = await getDocs(cartsRef);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  }

  return new Response(null, { status: 200 });
}