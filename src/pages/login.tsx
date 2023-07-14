import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/login.module.css'; // Estilos CSS
//import NEXT_PUBLIC_API_URL from '../../next.config'


const LoginForm = () => {
  const [user, setUser] = useState<string>(''); // | nulo >( nulo )
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');


  const SignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!user || !password) {
      setErrorMsg('Por favor, preencha os dados');
      return;
    }
    try {
      // Chama a API para validar o usuário e senha
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'endPoint-da-function-BACK-END', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        // Usuário válido, execute a lógica de autenticação ou redirecionamento
        // por exemplo, definindo um token de autenticação no local storage


        // Redirecionar para dentro do portal
        console.log('Successo ao logar');
      } else {
        setErrorMsg('Usuario ou senha Inválido');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Um erro ocorreu, Por favor tente outra vez.');
    }
  };

  const UserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const PasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(''); // Limpa a mensagem de erro ao digitar uma nova senha
  };

  return (
    <div>
      <header><img className={styles.logoAgenteF} src='/imgs/logoAgenteF.png' alt='LogoFacta' /></header>

      <div className={styles.login}>
        <div className={styles.card}>
          <img className={styles.logoSlogan} src='/imgs/logoSloganFacta.png'/>

          <form onSubmit={SignIn} className={styles.formulario}>
            <input type="text" name="user" autoComplete="user" placeholder="Username" id="inputID"
              className={`${styles.user} ${styles.placeholder} ${styles.inputFocus}`}
              value={user}
              onChange={UserChange}
           
            />

            <input type="password" name="password" placeholder="Password" autoComplete="current-password"
              className={`${styles.password} ${styles.placeholder} ${styles.inputFocus}`}
              value={password}
              onChange={PasswordChange}
   
            />

            {passwordError && <p className={styles.error}>{passwordError}</p>}
            {errorMsg && <p className={styles.error}>{errorMsg}</p>}

            <button className={styles.entrar} type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>

      <div className={styles.esqueci}>
        <div>
          <a className={styles.link} href="https://google.com">
            Esqueci a senha
          </a>
        </div>
        <div>
          <a className={styles.link} href="https://google.com">
            Cadastrar senha
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
