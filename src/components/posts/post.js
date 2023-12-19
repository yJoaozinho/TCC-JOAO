import Styles from "./post.module.css"
import Image from "next/image";
export default function Post({ idPet, nome, username, descricao }) {

    const PetId = idPet;


    return (
        <div className={Styles.post}>
            <div className={Styles.postHeader}>
                <img
                    src="/peraul.jpg"
                    alt={`Foto do dono`}
                />
                <div>
                    <div className={Styles.name}>{nome}</div>
                    <div className={Styles.timestamp}>{username}</div>
                </div>
            </div>
            <div className={Styles.postContent}>
                {descricao}
            </div>
            <div className={Styles.postFooter}>
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
            </div>
        </div>
    );
}
