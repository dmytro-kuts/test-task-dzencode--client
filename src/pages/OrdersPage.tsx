import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Orders } from '../components/Orders';
import { RootState } from '../redux/store';

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();

  const { orders } = useSelector((state: RootState) => state.orders);

  return (
    <section className="page__orders orders ">
      <div className="orders__container-big">
        <div className="orders__container">
          <h2 className="orders__title title">
            {t('header.orders')} /<span> {orders?.length ? orders.length : 0}</span>
          </h2>
          <Orders />
        </div>
      </div>
    </section>
  );
};


export default OrdersPage
