import styles from './ProgressBar.module.css';

function ProgressBar({credits, debts}) {
    const total = credits + debts;
    const creditPercent = (credits / total) * 100;
    const debtPercent = (debts / total) * 100;
    
    return (
        <div className={styles.progressBar}>
            <h3>Crédito/Débito</h3>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.bgGreen}
                    style={{ width: `${creditPercent}%` }}
                />
                <div
                    className={styles.bgRed}
                    style={{ width: `${debtPercent}%` }}
                />
            </div>
        </div>
    )
}

export default ProgressBar;