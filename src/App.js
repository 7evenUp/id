import logo from './logo.svg';
import styles from './styles.module.scss';
import { NamedButton } from './Components/utils/Buttons/NamedButton';
import React, { useState } from 'react';
import { Toggle } from './Components/utils/Buttons/ToggleButton';
import MainViewDesktop from './Components/MainViewDesktop/MainViewDesktop';
import Tabs from './Components/Tabs';

function App() {
  const [checked, setChecked] = useState(false);

  const handleCheck = (checked) => {
    setChecked((prevState) => !prevState);
  };
  console.log(checked, 'get chekced');
  return (
    <div className={styles.app}>
      {/*<NamedButton name={'история'} callback={() => console.log('Here')} />*/}
      <MainViewDesktop />
    </div>
  );
}

export default App;
