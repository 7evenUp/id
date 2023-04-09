import React from 'react';

import styles from './styles.module.scss';
import { BsArrowRight } from 'react-icons/all';
import { NamedButton } from '../../utils/Buttons/NamedButton';
import { Toggle } from '../../utils/Buttons/ToggleButton';

const ResearchBot = () => {
  return (
    <div className={styles.researchContainer}>
      <div className={styles.topBar}>
        <span className={styles.title}>Research Bot</span>
        <span className={styles.subTitle}>
          <BsArrowRight /> на сайт
        </span>
        <NamedButton
          name={'сохранить изменения'}
          callback={() => console.log('Saving...')}
        />
      </div>
      <div className={styles.midSection}>
        <span>Уведомления в браузере</span>
        <div className={styles.midSectionHighlighted}>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Research</span>
          </div>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Агрегатор</span>
          </div>
        </div>
      </div>
      <div className={styles.midSection}>
        <span>Отображение режимов</span>
        <div className={styles.midSectionHighlighted}>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Research</span>
          </div>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Агрегатор</span>
          </div>
        </div>
      </div>
      <div className={styles.midSectionBlock}>
        <span>Автопереводчик</span>
        <div className={styles.blockItem}>
          <div className={styles.item}>
            <span>Research</span>
            <div className={styles.midSectionHighlighted}>
              <div className={styles.midSectionToggleItem}>
                <Toggle handleChange={() => false} checked={false} />
                <span>Русский</span>
              </div>
              <div className={styles.midSectionToggleItem}>
                <Toggle handleChange={() => false} checked={false} />
                <span>Английский</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <span>Агрегатор</span>
            <div className={styles.midSectionHighlighted}>
              <div className={styles.midSectionToggleItem}>
                <Toggle handleChange={() => false} checked={false} />
                <span>Research</span>
              </div>
              <div className={styles.midSectionToggleItem}>
                <Toggle handleChange={() => false} checked={false} />
                <span>Агрегатор</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.midSection}>
        <span>Уведомления в браузере</span>
        <div className={styles.midSectionHighlighted}>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Research</span>
          </div>
          <div className={styles.midSectionToggleItem}>
            <Toggle handleChange={() => false} checked={false} />
            <span>Размер текста в новостях</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchBot;
