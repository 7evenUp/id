import React from 'react';
import Switch from 'react-switch';

import styles from './styles.module.scss';

export const Toggle = ({ checked, handleChange, name, isNamed }) => {
  console.log(isNamed, 'chekc name');
  return (
    <div aria-checked={checked} className={styles.wrapSwitch}>
      <Switch
        className={styles.switch}
        onChange={handleChange}
        aria-checked={checked}
        width={isNamed ? 74 : 37}
        height={18}
        uncheckedIcon={
          <div
            className={styles.boxInsideSwitch}
            style={{ position: 'absolute', right: '50%' }}
          >
            <p style={{ color: '#BDBDBD' }}>{isNamed ? name : false}</p>
          </div>
        }
        checkedIcon={
          <div
            className={styles.boxInsideSwitch}
            style={{ position: 'absolute', left: '50%' }}
          >
            <p style={{ color: '#333333' }}>{isNamed ? name : false}</p>
          </div>
        }
        checked={checked}
      />
    </div>
  );
};
