import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleShippingLabel = ({ saleID }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderCost, setOrderCost] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);


  useEffect(() => {
    fetchCustomerData();
    fetchOrderData();
  }, [saleID]);

  const fetchOrderData = () => {
    axios
      .get(`http://localhost:5000//orders/${saleID}`)
      .then((response) => {
        setOrder(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
      });
  };

  const fetchCustomerData = () => {
    axios
      .get(`http://localhost:5000/customers/${order.CustomerID}`)
      .then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  };


  return (
    <div>
      
    </div>
  );
};

export default SingleShippingLabel;
