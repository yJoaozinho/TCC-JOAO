import styles from './carteira.module.css'; 

export default function Coluna({ vacina, revacinacao, data }) {


    return (
        <div>
            <div className={styles.colunaContainer}>
                <div className={styles.block_content}>
                    <div className={styles.colunaItem_info}>Vacina</div>
                    <div className={styles.colunaItem_info}>Data</div>
                    <div className={styles.colunaItem_info}>Revacinação</div>
                </div>
                <div className={styles.block_content}>
                    <div className={styles.colunaItem}>{vacina}</div>
                    <div className={styles.colunaItem}>{data}</div>
                    <div className={styles.colunaItem}>{revacinacao}</div>
                </div>
            </div>
        </div>
    );
}
