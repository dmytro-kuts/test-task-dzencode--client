import React from 'react';

import { ReactComponent as RemoveSvg } from '../../../assets/img/icons/remove.svg';

export const ButtonDelate = ({ title, click }) => {
  return (
    <button className="button button--del" onClick={click}>
      <RemoveSvg />
      {title}
    </button>
  );
};
