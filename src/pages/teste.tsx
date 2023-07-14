import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';


// Interface para a resposta da API de autenticação
interface SignInResponse {
  error: string;
  jwt: string;
}

// Interface para o serviço de autenticação
interface AuthenticationService {
  signIn(email: string, password: string): Promise<SignInResponse>;
}


// Implementação concreta do serviço de autenticação usando a API
class APIAuthenticationService implements AuthenticationService {
  async signIn(email: string, password: string): Promise<SignInResponse> {
    // Lógica para fazer a chamada à API e autenticar o usuário
    const response = await fetch('https://', {
      method: 'POST',
      body: JSON.stringify({ email, pass: password })
    });

    const json = await response.json();
    return json;
  }
}

const Login: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const router = useRouter();

  // Função para lidar com o processo de login
  const signIn = async (email: string, password: string) => {
    // Instanciando o serviço de autenticação
    const authService: AuthenticationService = new APIAuthenticationService();

    try {
      // Fazendo a chamada à API de autenticação
      const response: SignInResponse = await authService.signIn(email, password);

      // Verificando a resposta da API
      setErrorMsg(response.error);

      if (response.error === '' && response.jwt !== '') {
        // Armazenando o JWT no localStorage e redirecionando para a página principal
        localStorage.setItem('jwt', response.jwt);
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [passwordError, setPasswordError] = useState<string>('');
  //const [emailError, setEmailError] = useState<string>('');
  
  // Função para lidar com o evento de envio do formulário de login
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Obtendo os valores dos campos de email e senha
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 dígitos.');
      //timeout limpar a senha
      return;
    }

    setPasswordError('');

    // Chamando a função de login
    signIn(email, password);
  };

  return (
   <div>
    <img src='../../public/logoAgenteF.png' alt='LogoFacta'></img>

    
    <header> teste </header>
     <div className={styles.login}>
      <div className={styles.card}>
        <h2 className={styles.title}>Facta - Financeira</h2>

          <form onSubmit={handleSignIn} className={styles.formulario}>
          
            <input className={`${styles.email} ${styles.placeholder} ${styles.inputFocus}`} 
                id="inputID" type="email" name="email" placeholder="Username" autoComplete="email"  />
            
            <input className={`${styles.password} ${styles.placeholder} ${styles.inputFocus}`} type="password" name="password" placeholder="Password" autoComplete="current-password" />
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            
            <button className={styles.entrar} type="submit" onClick={() => signIn}>Sign In</button>
          </form>
      </div>
    
    </div>

      <div className={styles.esqueci}>
        <div><a className={styles.link} href="https://google.com">Esqueci a senha</a></div>
        <div><a className={styles.link} href="https://google.com">Cadastrar senha</a></div>
      </div>

   </div>
  );
};

export default Login;
