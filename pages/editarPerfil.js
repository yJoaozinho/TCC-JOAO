import Styles from "../styles/index.module.css";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function TesteForm() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");
    const [cpf_cnpj, setCpf_cnpj] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [estado, setEstado] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Esta verificação assegura que estamos no lado do cliente
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('Token não encontrado 1');
                // Redirecione ou trate o erro de token não encontrado aqui
            }
            // Outras operações dependentes do token podem ser realizadas aqui
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Garantir que estamos no lado do cliente
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('Token não encontrado');
                // Tratamento para quando o token não está presente
                return;
            }

            const userData = parseJwt(token);
            if (!userData || !userData.id) {
                console.error('Não foi possível obter o ID do usuário do token');
                // Tratamento para quando não é possível obter o ID do usuário
                return;
            }

            const userId = userData.id;

            const dadosDoPerfil = {
                nomeUsuario,
                nickname,
                emailUsuario,
                cpf_cnpj,
                telefone,
                dataDeNascimento,
                cep,
                cidade,
                bairro,
                rua,
                estado
            };

            try {
                const response = await fetch(`https://sua-api.com/user/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dadosDoPerfil)
                });

                if (response.status === 204) {
                    console.log('Perfil atualizado com sucesso');
                    router.push('/perfilUsuario');
                } else {
                    const erroData = await response.json();
                    throw new Error(erroData.mensagem || 'Erro ao atualizar perfil');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    };

    const onClose = () => {
        router.push('/perfilUsuario');
    };

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Erro ao decodificar o JWT', e);
            return null;
        }
    }

    return (
        <div className={Styles.pagina}>
            <div className={Styles.modalOverlay}>
                <div className={Styles.modalContent}>
                    <h1 className={Styles.tituloh1}>Editar perfil</h1>
                    <button className={Styles.fechar} onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit}>

                        <input
                            className={Styles.input}
                            name="emailUsuario"
                            type="email"
                            placeholder="E-mail do usuário"
                            value={emailUsuario} onChange={(e) => setEmailUsuario(e.target.value)}
                        />
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
                        <button className={Styles.btnform} type="submit" >Enviar</button>

                        <button className={Styles.btnform} type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


