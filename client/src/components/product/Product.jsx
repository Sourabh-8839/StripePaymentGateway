import Card from '../Card/Card';
import './product.css';
import ProductItem from './ProductItem';

const Product = ({ products }) => {
  const items = (
    <ul className='product-items'>
      {products.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </ul>
  );
  return <Card className='product'>{items}</Card>;
};

export default Product;
