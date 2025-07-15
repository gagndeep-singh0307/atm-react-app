import React from 'react';
import styles from './styles.module.css';

export interface ButtonOption {
  label?: string;
  onClick?: () => void;
}

interface ButtonPanelProps {
  side: 'left' | 'right';
  options: ButtonOption[];
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ side, options }) => {
  const sideClass = side === 'left' ? styles.leftButtons : styles.rightButtons;
  const labelClass = side === 'left' ? styles.leftButtonLabel : styles.rightButtonLabel;

  return (
    <div className={sideClass}>
      {options.map((option, index) => (
        <div key={index} className={styles.buttonGroup}>
          <button 
            onClick={option.onClick} 
            className={styles.sideButton}
          />
          {option.label && <span className={labelClass}>{option.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default ButtonPanel;