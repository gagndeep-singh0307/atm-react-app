import styles from './styles.module.css';

const ScreenComponent: React.FC<{ children?: React.ReactNode, message?: string }> = ({ children, message }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.welcomeText}>{message}</div>
            {children}
        </div>
    );     
};

export default ScreenComponent;