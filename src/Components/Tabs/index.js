import React, { useState } from 'react';

import { ReactComponent as ResearchIcon } from '../../assets/Tab_1.svg';
import { ReactComponent as PrimeIcon } from '../../assets/Tab_2.svg';
import { ReactComponent as ToolsIcon } from '../../assets/Tab_3.svg';
import { ReactComponent as OIcon } from '../../assets/Tab_4.svg';
import { ReactComponent as UIcon } from '../../assets/Tab_5.svg';
import { ReactComponent as Academy } from '../../assets/Tab_6.svg';

import styles from './styles.module.scss';
import ResearchBot from './ResearchBot';

const tabsItems = [
  {
    icon: <ResearchIcon />,
    name: 'research',
  },
  {
    icon: <PrimeIcon />,
    name: 'prime',
  },
  {
    icon: <ToolsIcon />,
    name: 'tools',
  },
  {
    icon: <OIcon />,
    name: 'oi',
  },
  {
    icon: <UIcon />,
    name: 'ui',
  },
  {
    icon: <Academy />,
    name: 'academy',
  },
];

const Tabs = () => {
  const [selected, setSelected] = useState('research');

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabsItems.map((item) => (
          <div
            onClick={() => setSelected(item.name)}
            key={item.name}
            className={
              item.name === selected ? styles.tabItemActive : styles.tabItem
            }
          >
            {item.icon}
          </div>
        ))}
      </div>
      {selected === 'research' ? <ResearchBot /> : <h1>Coming Soon</h1>}
    </div>
  );
};

export default Tabs;
