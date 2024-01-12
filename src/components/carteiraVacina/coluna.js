import styles from './carteira.module.css'; 

export default function Coluna({ vacina, revacinacao, data }) {


    return (
        <div className={styles.colunaContainer}>
            <span className={styles.colunaItem}>Vacina: {vacina}</span>
            <span className={styles.colunaItem}>Data: {data}</span>
            <span className={styles.colunaItem}>Revacinacao: {revacinacao}</span>
            
        </div>
    );
}
