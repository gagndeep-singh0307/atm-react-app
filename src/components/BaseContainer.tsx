import styles from './styles.module.css';
import atmLogo from '../assets/atm_sign.png';
import sticker from '../assets/sticker_graf.png';
import systemsLabel from '../assets/systems.png';
import graffiti from '../assets/graffiti.png';

const BaseComponent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img  src={atmLogo} className={styles.headerLogo} alt="ATM"/>
                </div>

                {children}

                <img src={graffiti} alt="GRAFFITI" className={styles.graffiti} />
                <img src={sticker} alt="STICKER" className={styles.sticker} />
                <img src={systemsLabel} alt="SYSTEMS" className={styles.systemLabel} />
            </div>
        </>
    );     
};

export default BaseComponent;