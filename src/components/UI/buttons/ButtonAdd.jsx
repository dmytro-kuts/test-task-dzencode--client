import React from 'react';

import { ReactComponent as AddSvg } from '../../../assets/img/icons/add.svg';

export const ButtonAdd = ({ title }) => {
  return (
    <button className="button button--add" aria-label="Add">
      <AddSvg />
      <span>{title}</span>
    </button>
  );
};
