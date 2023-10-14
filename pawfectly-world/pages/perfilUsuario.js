import Styles from "../styles/index.module.css"
import SideBar from "../src/components/sideBar/sideBar"
import FotoDePerfil from "../src/components/fotoDePerfil/fotoDePerfil"
import Link from "next/link"
import { useState } from 'react';

export default function perfilUsuario() {

    const [formData, setFormData] = useState({
        nomeUsuario: '',
        apelidoUsuario: '',
        emailUsuario: '',
        senhaUsuario: '',
        cpf_cnpj: '',
        telefone: '',
        dia: '',
        mes: '',
        ano: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCloseModal();

        console.log(formData);
    };
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    function Modal({ isOpen, onClose }) {
        if (!isOpen) return null;

        return (
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>

                    <h1 className={Styles.tituloh1}>Editar perfil</h1>
                <button className={Styles.fechar} onClick={onClose}>Fechar</button>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={Styles.input}
                            name="nomeUsuario"
                            value={formData.nomeUsuario}
                            placeholder="Nome de usuário"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="apelidoUsuario"
                            value={formData.apelidoUsuario}
                            placeholder="Apelido do usuário"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="emailUsuario"
                            value={formData.emailUsuario}
                            type="email"
                            placeholder="E-mail do usuário"
                            onChange={handleChange}
                        />
                        <div className={Styles.passwordContainer}>
                            <input
                                className={Styles.inputSenha}
                                type="password"
                                name="senha"
                                id="senha"
                                value={formData.senha}
                                placeholder="Senha"
                                onChange={handleChange}
                            />
                            <button className={Styles.btnSenha}>Alterar Senha</button>
                        </div>
                        <input
                            className={Styles.input}
                            name="cpf_cnpj"
                            value={formData.cpf_cnpj}
                            placeholder="CPF ou CNPJ"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="telefone"
                            value={formData.telefone}
                            placeholder="Telefone"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="dia"
                            value={formData.dia}
                            placeholder="Dia"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="mes"
                            value={formData.mes}
                            placeholder="Mês"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="ano"
                            value={formData.ano}
                            placeholder="Ano"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="cep"
                            value={formData.cep}
                            placeholder="CEP"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="estado"
                            value={formData.estado}
                            placeholder="Estado"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="cidade"
                            value={formData.cidade}
                            placeholder="Cidade"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="bairro"
                            value={formData.bairro}
                            placeholder="Bairro"
                            onChange={handleChange}
                        />
                        <input
                            className={Styles.input}
                            name="rua"
                            value={formData.rua}
                            placeholder="Rua"
                            onChange={handleChange}
                        />
                        <button className={Styles.btnform} type="submit" >Enviar</button>

                    </form>
                    
                </div>
            </div>
        );
    }

    return (
        <div className={Styles.container}>
            <SideBar />
            <div className={Styles.perfil}>
                <FotoDePerfil h="250" w="300" />
                <button className={Styles.link} onClick={handleOpenModal}>
                    Editar perfil
                </button>
                <Link className={Styles.link} href='/' >
                    Adoções e doações
                </Link>
                <div className={Styles.infoUsuario}>
                    <div className={Styles.campo}>
                        <strong>Nome:</strong>
                        <span>John Doe</span>
                    </div>
                    <div className={Styles.campo}>
                        <strong>E-mail:</strong>
                        <span>john.doe@example.com</span>
                    </div>
                    <div className={Styles.campo}>
                        <strong>Nickname:</strong>
                        <span>johnd</span>
                    </div>
                </div>

                <div className={Styles.posts}>
                    <strong>posts:</strong>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}
