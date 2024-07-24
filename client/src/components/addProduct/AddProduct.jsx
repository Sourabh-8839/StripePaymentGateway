import { useState } from 'react';
import './AddProduct.css';
import Cart from '../Cart/Cart';
import { createPortal } from 'react-dom';
import { useCart } from '../../context';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
  });
  const [showCart, setShowCart] = useState(null);
  //Context api
  // const { addProduct } = useProduct();

  const { cartList } = useCart();

  const body = document.querySelector('body');

  //Change input handler
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({ ...formData, [name]: value });
  // };

  const cartItemsLength = cartList.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  //Form Submihandler or Adding candy
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData['Name'] === '') {
      alert('Please Fill Name Field');
      return;
    }

    if (formData['Description'] === '') {
      alert('Please Fill Description Field');
      return;
    }

    if (formData['Price'] === '') {
      alert('Please Fill Price Field');
      return;
    }
    addProduct(formData);

    setFormData({ Name: '', Description: '', Price: '' });
  };

  const onCloseHandler = () => {
    setShowCart(null);
  };

  const onConfirmHandler = () => {};

  const cartOpenHandler = () => {
    setShowCart(true);
  };

  return (
    <>
      {showCart &&
        createPortal(
          <Cart onConfirm={onConfirmHandler} onClose={onCloseHandler} />,
          body
        )}

      <div className='form-container'>
        <h2>Flipcart</h2>

        <button id='cart' onClick={cartOpenHandler}>
          Cart - <span>{cartItemsLength} </span>
        </button>
      </div>
    </>
  );
};

export default AddProduct;
