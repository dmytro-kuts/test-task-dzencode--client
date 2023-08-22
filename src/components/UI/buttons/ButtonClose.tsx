import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloseSvg } from '../../../assets/img/icons/close.svg';

interface ButtonProps {
  click: () => void;
}

export const ButtonClose: React.FC<ButtonProps> = ({ click }) => {
  const { t } = useTranslation();
  return (
    <button className="button button--close" aria-label={t('button.setting')} onClick={click}>
      <CloseSvg />
    </button>
  );
};
