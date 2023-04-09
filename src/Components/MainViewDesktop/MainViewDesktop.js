import React from 'react';
import TopNavBar from '../TopNavBar';
import PersonalCabinet from '../PersonalCabinet';
import styles from './styles.module.scss';
import Tabs from '../Tabs';

const MainViewDesktop = () => {
  return (
    <div className={styles.mainContainer}>
      <TopNavBar />
      <div className={styles.mainView}>
        <PersonalCabinet />
        <Tabs />
      </div>
    </div>
  );
};

export default MainViewDesktop;
