import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as AddSvg } from '../../../assets/img/icons/add.svg';

interface ButtonProps {
  title: string;
}

export const ButtonAdd: React.FC<ButtonProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <button className="button button--add" aria-label={t('button.add')}>
      <AddSvg />
      <span>{title}</span>
    </button>
  );
};

