import styles from './carteira.module.css'; 

export default function Coluna({ vacina, revacinacao, data }) {


    return (
        <div className={styles.colunaContainer}>
            <span className={styles.colunaItem}>{vacina}</span>
            <span className={styles.colunaItem}>{revacinacao}</span>
            <span className={styles.colunaItem}>{data}</span>
        </div>
    );
}
