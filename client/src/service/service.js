import axios from 'axios';

const URL = 'http://localhost:8000/api/v1';

const OrderPayment = async (data) => {
  try {
    console.log(data);
    const response = axios.post(`${URL}/create-payment-intent`, data);

    return response;
  } catch (error) {
    console.log(error.message);
    return error.response;
  }
};

export { OrderPayment };
