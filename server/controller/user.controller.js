const Order = require('../models/Order.models.js');
const stripe = require('stripe')(
  'sk_test_51Pg07TRqCttqZEkSFWkPvOCSvHaHYfZStkUFFLBM2C8mJnuNkw9kSo37AkNUOTk8TUndPgnyuNyXl31SnLpHpSmw00FQiCoKPB'
);

const paymentOrder = async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    console.log(session);

    await Order.create({
      transactionId: session.id,
      paymentStatus: 'success',
      purschaseItem: products,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(200).json({ error: 'Transaction failed' });
  }
};

module.exports = { paymentOrder };
