import React from 'react';

import { ReactComponent as RemoveSvg } from '../../../assets/img/icons/remove.svg';

export const ButtonRemove = ({ click }) => {
  return (
    <button className="button button--remove" onClick={click}>
      <RemoveSvg />
    </button>
  );
};
