import React from 'react';

import { ReactComponent as RemoveSvg } from '../../../assets/img/icons/remove.svg';

interface ButtonProps {
  title: string;
  click: () => void;
}

export const ButtonDelate: React.FC<ButtonProps> = ({ title, click }) => {
  return (
    <button className="button button--del" onClick={click}>
      <RemoveSvg />
      {title}
    </button>
  );
};
