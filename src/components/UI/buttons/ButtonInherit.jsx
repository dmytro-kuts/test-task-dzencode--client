import React from 'react';

export const ButtonInherit = ({ title, click }) => {
  return (
    <button className="button button--inherit" onClick={click}>
      {title}
    </button>
  );
};
