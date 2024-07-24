import { useState } from 'react';

import './App.css';
import AddProduct from './components/addProduct/AddProduct';
import Product from './components/product/Product';
import { CartProvider } from './context';
// import { ProductProvider } from './context';

const intialProduct = [
  {
    id: 1,
    name: 'IPhone 14',
    description: 'curve diplay 6.27inch',
    price: 4550,
  },
  {
    id: 2,
    name: 'OnePlus Earphone',
    description: 'it very good product ',
    price: 2000,
  },
  {
    id: 3,
    name: 'realme Earphone',
    description: 'dolby atom ',
    price: 1000,
  },
  {
    id: 4,
    name: 'IqOO Z9 ',
    description: 'Curved Display',
    price: 17000,
  },
  {
    id: 5,
    name: ' Motorala 50 fusion ',
    description: 'Curved Display',
    price: 22000,
  },
];

function App() {
  const [products, setProducts] = useState(intialProduct);
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    const existingCartItemIndex = cartList.findIndex(
      (items) => items.id === item.id
    );

    const existingCartItem = cartList[existingCartItemIndex];

    let updateItems;

    // console.log(existingCartItem);
    // console.log(item);

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + item.quantity,
      };

      updateItems = [...cartList];

      updateItems[existingCartItemIndex] = updateItem;

      setCartList(updateItems);

      const IncreaseAmount = +(updateItem.price * item.quantity);

      setTotal((prevTotal) => prevTotal + IncreaseAmount);
    } else {
      const priceOfItem = +(item.price * item.quantity);

      setTotal((prevTotal) => prevTotal + priceOfItem);
      setCartList((prev) => [...prev, item]);
    }
  };

  const removeItem = (id) => {
    const existingCartItemIndex = cartList.findIndex((item) => item.id === id);

    const existingCartItem = cartList[existingCartItemIndex];

    setTotal((prevTotal) => prevTotal - existingCartItem.price);

    let updateItems;

    if (existingCartItem.quantity === 1) {
      updateItems = cartList.filter((item) => item.id != id);

      setCartList(updateItems);
    } else {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updateItems = [...cartList];

      updateItems[existingCartItemIndex] = updateItem;

      setCartList(updateItems);
    }
  };

  return (
    <CartProvider value={{ addItem, cartList, total, removeItem }}>
      <AddProduct />
      <Product products={products} />
    </CartProvider>
  );
}

export default App;
