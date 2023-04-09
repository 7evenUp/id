import React, { useState } from 'react';

import { BsArrowLeft } from 'react-icons/all';
import { Toggle } from '../utils/Buttons/ToggleButton';
import styles from './styles.module.scss';

const TopNavBar = () => {
  const [theme, setTheme] = useState(false);
  const [lang, setLang] = useState(false);
  return (
    <div className={styles.topNavBar}>
      <a className={styles.topNavBar__left}>
        <BsArrowLeft /> назад к сайту
      </a>
      <div className={styles.topNavBar__right}>
        <Toggle
          isNamed={false}
          checked={theme}
          handleChange={() => setTheme((prevState) => !prevState)}
        />
        <Toggle
          isNamed={false}
          checked={lang}
          handleChange={() => setLang((prevState) => !prevState)}
        />
      </div>
    </div>
  );
};

export default TopNavBar;
