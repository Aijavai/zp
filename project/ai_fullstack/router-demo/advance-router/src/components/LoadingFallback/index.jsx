import styles from './index.module.css'

export default function LoadingFallback() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}>
                <div className={styles.spinnerBar}></div>
                <div className={styles.spinnerBar}></div>
                <div className={styles.spinnerBar}></div>
                <div className={styles.spinnerBar}></div>
            </div>
            <p>Loading...</p>
        </div>
    )
}