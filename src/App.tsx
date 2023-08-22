import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layouts//MainLayout';
import { Preloader } from './components/UI/Preloader';

const OrdersPage = React.lazy(
  () => import(/*webpackChunkName: "OrdersPage"*/ './pages/OrdersPage'),
);
const ProductsPage = React.lazy(
  () => import(/*webpackChunkName: "ProductsPage"*/ './pages/ProductsPage'),
);

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="orders"
          element={
            <Suspense fallback={<Preloader />}>
              <OrdersPage />
            </Suspense>
          }
        />
        <Route
          path="products"
          element={
            <Suspense fallback={<Preloader />}>
              <ProductsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
