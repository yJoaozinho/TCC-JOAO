import Styles from "./meusPets.module.css"
import Image from "next/image"
import { useRouter } from "next/router"

export default function MeusPets({ pet }) {
    const router = useRouter();

    function irPerfil() {
        
        router.push(`/perfilPet/${pet._id}`);
    }

    
    if (!pet) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={Styles.content}>
            <a className={Styles.a}><strong>{pet.nome}</strong></a>
            <div className={Styles.foto}>
                
                <Image src="/gato.jpg" width={170} height={170} alt="Imagem do Pet" />
            </div>
            <button className={Styles.button} onClick={irPerfil}>Ir para Perfil!</button>
        </div>
    )
}
