import Styles from "../styles/index.module.css"
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function testeForm() {

    const [nomeUsuario, setNomeUsuario] = useState("")
    const [nickname, setNickname] = useState("")
    const [emailUsuario, setEmailUsuario] = useState("")
    const [senha, setSenha] = useState ("")
    const [cpf_cnpj, setCpf_cnpj] = useState("")
    const [telefone, setTelefone] = useState("")
    const [dataDeNascimento, setDataDeNascimento] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [bairro, setBairro] = useState("")
    const [rua, setRua] = useState("")
    const [estado, setEstado] = useState("")
    const router = useRouter();

    const onClose = async (e) => {
        router.push('/perfilUsuario');
    }

        return (
        <div className={Styles.pagina}>
        <div className={Styles.modalOverlay}>
            <div className={Styles.modalContent}>

                <h1 className={Styles.tituloh1}>Editar perfil</h1>
            <button className={Styles.fechar} onClick={onClose}>X</button>
                <form>
                    <input
                        className={Styles.input}
                        name="nomeUsuario"
                        placeholder="Nome de usuário"
                        value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} 
                    />
                    <input
                        className={Styles.input}
                        name="nickname"
                        placeholder="nickname"
                        value={nickname} onChange={(e) => setNickname(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="emailUsuario"
                        type="email"
                        placeholder="E-mail do usuário"
                        value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)}
                    />
                    <div className={Styles.passwordContainer}>
                        <input
                            className={Styles.inputSenha}
                            type="password"
                            name="senha"
                            id="senha"
                            placeholder="Senha"
                            value={senha} onChange={(e) => setSenha(e.target.value)}
                        />
                        <button className={Styles.btnSenha}>Alterar Senha</button>
                    </div>
                    <input
                        className={Styles.input}
                        name="cpf_cnpj"
                        placeholder="CPF"
                        value={cpf_cnpj} onChange={(e) => setCpf_cnpj(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="telefone"
                        placeholder="Telefone"
                        value={telefone} onChange={(e) => setTelefone(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="dataDeNascimento"
                        placeholder="data"
                        value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="cep"
                        placeholder="CEP"
                        value={cep} onChange={(e) => setCep(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="estado"
                        placeholder="Estado"
                        value={estado} onChange={(e) => setEstado(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="cidade"
                        placeholder="Cidade"
                        value={cidade} onChange={(e) => setCidade(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="bairro"
                        placeholder="Bairro"
                        value={bairro} onChange={(e) => setBairro(e.target.value)}
                    />
                    <input
                        className={Styles.input}
                        name="rua"
                        placeholder="Rua"
                        value={rua} onChange={(e) => setRua(e.target.value)}
                    />
                    <button className={Styles.btnform} onClick={onClose} >Enviar</button>

                </form>
                
            </div>
        </div>
    
        </div>     
        );
    }

