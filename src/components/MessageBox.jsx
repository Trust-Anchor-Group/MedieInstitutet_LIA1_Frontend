import React from 'react';

export const MessageBox = (props) => {
  const { type, children } = props;
  return (
    <div className={`message ${type && 'message__' + type}`}>{children}</div>
  );
};
