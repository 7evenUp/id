import React, { useState } from 'react';

import styles from './styles.module.scss';
import { Input } from '../utils/Inputs/Input';
import { BsArrowLeft, BsPlus } from 'react-icons/all';
import { NamedButton } from '../utils/Buttons/NamedButton';

const PersonalCabinet = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const handleChangeNickname = (_) => {
    setNickname(_);
  };

  const handleChangeEmail = (_) => {
    setEmail(_);
  };

  return (
    <div className={styles.personalCabinetContainer}>
      <div className={styles.personalCabinetHeader}>
        <p className={styles.personalCabinetTitle}>ЛИЧНЫЙ КАБИНЕТ</p>
        <p className={styles.circledText}>J</p>{' '}
        {/* Will Replace with an Image Here */}
      </div>
      <div className={styles.profile}>
        <p className={styles.profileTitle}>Профиль</p>
        <div className={styles.inputBlock}>
          <p className={styles.label}>ник</p>
          <Input value={nickname} onChange={handleChangeNickname} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.label}>почта</p>
          <Input value={email} onChange={handleChangeEmail} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.label}>кошелек</p>
          <BsPlus />
        </div>
        <div>
          <div
            className={styles.inputBlock}
            style={{ width: '45%', marginRight: '10%' }}
          >
            <p className={styles.label}>discord</p>
            <BsPlus />
          </div>
          <div className={styles.inputBlock} style={{ width: '45%' }}>
            <p className={styles.label}>telegram</p>
            <BsPlus />
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <p className={styles.profileTitle}>Подписка</p>
        <div className={styles.inputBlock}>
          <p className={styles.label}>
            мой баланс: <span>$100</span>
          </p>
          <div>
            <NamedButton name={'история'} />
            <NamedButton name={'пополнить баланс'} />
          </div>
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.label}>
            дней до конца подписки:<span>13</span>
          </p>
          <div>
            <NamedButton name={'продлить подписку'} />
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <p className={styles.profileTitle}>Реферальная система</p>
        <div className={styles.inputBlock}>
          <p className={styles.label}>
            реферальная система: <span>33%</span>
          </p>
          <div>
            <NamedButton name={'промокод'} />
            <NamedButton name={'ссылка'} />
          </div>
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.label}>
            реферальная баланс: <span>$250</span>
          </p>
          <div>
            <NamedButton name={'вывести'} />
          </div>
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.label}>статистика</p>
          <div>
            <NamedButton name={'посмотреть'} />
          </div>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <a className={styles.bottomBlockLeft}>выйти из аккаунта</a>
        <a className={styles.bottomBlockRight}>деактивировать аккаунт</a>
      </div>
    </div>
  );
};

export default PersonalCabinet;
