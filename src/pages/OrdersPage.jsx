import React from 'react';
import { useSelector } from 'react-redux';

import { Orders } from '../components/Orders';

export const OrdersPage = () => {
  const { orders } = useSelector((state) => state.orders);
  return (
    <section className="page__orders orders ">
      <div className="orders__container-big">
        <div className="orders__container">
          <h2 className="orders__title title">
            Orders /<span> {orders?.length ? orders.length : 0}</span>
          </h2>
          <Orders />
        </div>
      </div>
    </section>
  );
};
