import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from 'next/headers';
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') ?? "";
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || "",
        );
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
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
        const currency = session?.currency;
        const email = session?.customer_details?.email;
        const name = session?.customer_details?.name;

        // Create an array of items for the order
        const orderItems = images.map((image: string, index: number) => {
            return {
                productImage: image,
                productName: productNames[index],
                quantity: quantities[index],
                selectedSize: selectedSizes[index],
                price: price[index],
                category: category[index],
                slug: slug[index],
            };
        })

        /// Store data in Firestore
        /// write in users/{userId}/orders/{orderId}
        await addDoc(collection(db, "orders"), {
            userId,
            paymentId,
            amount,
            createdAt: serverTimestamp(),
            currency,
            email,
            name,
            orderItems,
        });

        // Clear the Cart   ---------- TODO
        // const cartsRef = collection(db, `users/${userId}/cart`);
        // const [cartSnapshots] = useCollection(cartsRef);
        // cartSnapshots?.docs.forEach(async (doc) => {
        //     await deleteDoc(doc.ref);
        // });
    }

    return new Response(null, { status: 200 })
}