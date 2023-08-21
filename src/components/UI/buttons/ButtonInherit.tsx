import React from 'react';

interface ButtonProps {
  title: string;
  click: () => void;
}

export const ButtonInherit: React.FC<ButtonProps> = ({ title, click }) => {
  return (
    <button className="button button--inherit" onClick={click}>
      {title}
    </button>
  );
};
