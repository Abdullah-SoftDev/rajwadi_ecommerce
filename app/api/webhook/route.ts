import type Stripe from "stripe"
import { stripe } from "@/lib/stripe";
import { headers } from 'next/headers';
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') ?? ""
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || "",
        )
    } catch (error: any) {
        console.error(error)
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }

    console.log("success✅")

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        await addDoc(collection(db, "orders"), {
            uid: session?.metadata?.userId,
            paymentId: session.id,
            amount: session?.amount_total! / 100,
            images: session?.metadata?.images,
            createdAt: serverTimestamp(),
        });
    }
    return new Response(null, { status: 200 });
}