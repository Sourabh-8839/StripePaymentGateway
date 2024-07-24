import React from 'react';
import './ProductItem.css';
import { useCart } from '../../context';

const ProductItem = ({ item }) => {
  const { addItem } = useCart();

  const Buyone = () => {
    const items = {
      ...item,
      quantity: 1,
    };

    addItem(items);
  };

  return (
    <li className='list'>
      <div className='product-name'>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>

      <div> $ {item.price}</div>

      <div className='product-size'>
        <button onClick={Buyone}>Add to Cart</button>
        {/* <button onClick={BuyTwo}>Buy Two </button>
        <button onClick={BuyThree}>Buy Three</button> */}
      </div>
    </li>
  );
};

export default ProductItem;
