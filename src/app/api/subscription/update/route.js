import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { saveSubscription } from "@/lib/api/subscription";

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 },
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not complete" },
        { status: 400 },
      );
    }

    const { userId, planId } = checkoutSession.metadata;
    const sub = checkoutSession.subscription;

    await saveSubscription({
      userId,
      planId,
      email: checkoutSession.customer_email,
      stripeCustomerId: checkoutSession.customer,
      stripeSubscriptionId: sub.id,
      stripePriceId: sub.items.data[0].price.id,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end * 1000,
    });

    return NextResponse.json({ success: true, planId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
