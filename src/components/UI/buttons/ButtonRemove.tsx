import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as RemoveSvg } from '../../../assets/img/icons/remove.svg';

interface ButtonProps {
  click: () => void;
}

export const ButtonRemove: React.FC<ButtonProps> = ({ click }) => {
  const { t } = useTranslation();
  return (
    <button className="button button--remove" aria-label={t('button.remove')} onClick={click}>
      <RemoveSvg />
    </button>
  );
};
