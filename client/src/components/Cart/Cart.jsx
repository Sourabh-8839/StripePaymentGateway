import './Cart.css';
import { useCart } from '../../context';
import CartItem from './CartItem';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckOutForm';
import { OrderPayment } from '../../service/service.js';

const stripePromise = loadStripe(
  'pk_test_51Pg07TRqCttqZEkSmcTkbLYI5AgKPrQMVYQvVDSYelDoFQWjmP92mZE02ZPB9Yo5b6kGdmkPEpRxfnKrJx6yjuhT00o5ckKxGB'
);

const Cart = (props) => {
  const { total, cartList, addItem, removeItem } = useCart();
  const [clientSecret, setClientSecret] = useState('');

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const onAddHandler = (item) => {
    const increaseQuantity = { ...item, quantity: 1 };
    addItem(increaseQuantity);
  };

  const [checkOut, setCheckOut] = useState(false);

  const onRemoveHandler = (id) => {
    removeItem(id);
  };
  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51Pg07TRqCttqZEkSmcTkbLYI5AgKPrQMVYQvVDSYelDoFQWjmP92mZE02ZPB9Yo5b6kGdmkPEpRxfnKrJx6yjuhT00o5ckKxGB'
    );

    const body = {
      products: cartList,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(
      'http://localhost:8000/api/create-checkout-session',
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    console.log(session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const mealItem = (
    <ul className='list-none m-0 p-0 max-h-80 overflow-auto'>
      {cartList.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <div>
      <div className='backdrop'></div>
      <Card className='modal'>
        <header className='p-4'> {mealItem}</header>
        <div className='form'>
          <p>
            Total Amount : <span> $ {total}</span>{' '}
          </p>
        </div>
        <footer className='actions'>
          <button onClick={makePayment}>Order</button>
          <button onClick={() => setCheckOut(false)}>Close</button>
        </footer>
      </Card>
    </div>
  );
};

export default Cart;
