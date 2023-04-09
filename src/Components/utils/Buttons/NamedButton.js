import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import 'bootstrap/scss/bootstrap.scss';
export const NamedButton = ({ name, callback }) => {
  return (
    <Button
      className={styles.namedButton}
      variant="outline-dark"
      onClick={callback}
    >
      {name}
    </Button>
  );
};
