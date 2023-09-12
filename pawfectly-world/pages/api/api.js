const BASE_URL = 'http://localhost:3000'; 

export async function login(email, password) {

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_ou_username, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }

  const data = await response.json();
  return data;
}

export async function cadastrar(email, password) {
  const response = await fetch(`${BASE_URL}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_ou_username, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar');
  }

  const data = await response.json();
  return data;
}
