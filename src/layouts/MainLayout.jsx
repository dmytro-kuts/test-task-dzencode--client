import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopMenu } from '../components/TopMenu';
import { NavigationMenu } from '../components/NavigationMenu';

export const MainLayout = () => {
  return (
    <div className="wrapper">
      <TopMenu />
      <main className="page">
        <NavigationMenu />
        <Outlet />
      </main>
    </div>
  );
};
