import styles from './loginCard.module.css'

export default function LoginCard({ children }) {
    return(
        <div className={styles.background_fix}>
            <div className={styles.card}>
            {children}
            </div>
        </div>
    )
}