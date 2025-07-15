import React from 'react';
import styles from './styles.module.css';
import sprite from '../assets/creditcard_sprite.png';

interface StatusBarProps {
  activeIndex?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeIndex = -1 }) => {
  return (<>
        <img src={sprite} alt="SPRITE" className={styles.sprite} />
        <div className={styles.statusBar}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
            <div 
            key={index} 
            className={`${styles.statusIndicator} ${activeIndex === index ? styles.statusActive : ''}`}
            />
        ))}
        </div>
    </>
  );
};

export default StatusBar;