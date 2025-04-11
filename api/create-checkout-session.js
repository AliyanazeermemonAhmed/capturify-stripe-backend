const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1R9D4JGGNueOoYjKL6P1akN8',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.capturify.io/thank-you',
      cancel_url: 'https://www.capturify.io/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe Checkout Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
