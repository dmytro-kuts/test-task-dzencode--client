import React from 'react';

import Spiner from '../../assets/img/icons/preloader.svg';

export const Preloader: React.FC = () => {
  return <img className="preloader" src={Spiner} alt="Spiner" />;
};
