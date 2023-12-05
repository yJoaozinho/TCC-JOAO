import Styles from "./post.module.css"
import  Image  from "next/image";
export default function Post({ title, description, name, nickname }) {
    return (
        <div className={Styles.post}>
            <div className={Styles.postImage}>
                <Image src="/logo.jpg"alt="Imagem do post" width={200} height={200} />
            </div>
            <div className={Styles.tudao}>
                <div className={Styles.postHeader}>
                    <div className={Styles.name}>{name}</div>
                    <div className={Styles.nickname}>{nickname}</div>

                </div>

                <div className={Styles.postContent}>
                    <h2 className={Styles.h2}>{title}</h2>
                    <p className={Styles.p}>{description}</p>
                    <div className={Styles.postActions}>
                        <button className={Styles.likeButton}>Like</button>
                        <button className={Styles.commentButton}>Comentar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
