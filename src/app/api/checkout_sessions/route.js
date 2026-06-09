import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { PLAN_PRICE_ID } from "@/lib/stripe";
import { getSession } from "@/lib/auth-session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    // form data
    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_ID[planId];
    // session
    const sessionData = await getSession();
    const user = sessionData?.user;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { planId,
        userId:user.id,

       },
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
