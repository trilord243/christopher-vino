import Stripe from "stripe";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items, origin } = (await request.json()) as {
      items: CheckoutItem[];
      origin: string;
    };

    if (!items || items.length === 0) {
      return Response.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image.startsWith("http") ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

    // Add shipping cost if subtotal < $100
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    if (subtotal < 100) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Envío" },
          unit_amount: 999,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return Response.json({ error: message }, { status: 500 });
  }
}
