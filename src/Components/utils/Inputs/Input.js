import React from 'react';

import styles from './styles.module.scss';

export const Input = (props) => {
  return (
    <input
      type={'text'}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
      className={styles.inputField}
    />
  );
};
