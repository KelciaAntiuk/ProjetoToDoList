import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";

function Cadastro({ onCadastroCompleto }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [error, setError] = useState(false);
  const [errorCd, setErrorCd] = useState(false);
  const [userName, setUserName] =('');
  const navigate = useNavigate();

  const handleCadastroCompleto = (userName) => {
    setShowSuccessMessage(true);
    onCadastroCompleto(userName); // Passa o userName para onCadastroCompleto
  };

 

  const redirectToLogin = () => {
    setIsLoginPage(true);
  };
  const redirectToCadastro = () => {
    setIsLoginPage(false);
  };


  const handleRegister = async (values) => {
    const { title, empresa, email, password } = values;

    try {

      const response = await fetch(`http://localhost:3333/users`);
      const userData = await response.json();
      const userWithEmail = userData.find(user => user.email === email);

      if (userWithEmail) {
        // Usuário já cadastrado
        setErrorCd(true);
        return;
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = { title, empresa, email, password: hashedPassword };

      await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      setShowSuccessMessage(true);
      // Redirecionar para outra página após o cadastro
      redirectWithDelay();
      handleCadastroCompleto();
    } catch (error) {
      console.error('Error adding people:', error);
    }
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
  
    try {
      const response = await fetch('http://localhost:3333/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const user = userData.find(user => user.email === email);
  
      if (!user) {
        setError(true);
        throw new Error('User not found');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {

        // Redirecionar para outra página após o login
        redirectWithDelay(user.id);
        handleCadastroCompleto();
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  
  const redirectWithDelay = (userName) => {
    setTimeout(() => {
      navigate('/Home', { state: { userName: userName } });
      console.log('username', userName)
    }, 3000);
  };



  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    title: yup
      .string()
      .required("Seu nome é obrigatório"),
    empresa: yup
      .string()
      .required("Sua empresa é obrigatória"),
  });

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .required("A senha é obrigatória"),
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'rgba(128, 128, 128, 0.5)', // Cor cinza com 50% de opacidade
      backgroundImage: 'url("https://getwallpapers.com/wallpaper/full/f/3/9/1109114-free-download-purple-wallpaper-for-computer-2880x1800-for-pc.jpg")', // Substitua o caminho pela URL da sua imagem
      backgroundSize: 'cover', // Para cobrir todo o elemento com a imagem
      backgroundPosition: 'center' // Para centralizar a imagem dentro do elemento
    }}>
      <div style={{
        width: '300px',
        padding: '50px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgb(80, 20, 73, 0.5)'
      }}
      >
        
        <h1
          style={{
            textAlign: 'center',
            color:'white',
            fontSize:'40px',
            marginTop:'-10px'
          }}
        >
          {isLoginPage ? 'Login' : 'Cadastro'}
        </h1>
        <Formik
          initialValues={{}}
          onSubmit={isLoginPage ? handleLogin : handleRegister}
          validationSchema={isLoginPage ? validationsLogin : validationsRegister}
        >
          <Form
            style={{
              marginLeft: '-17px'
            }}>
            {showSuccessMessage && (
              <div
                style={{
                  color: 'light-green',
                  fontSize: '16px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  color:'rgb(176, 242, 194)'
                }}
              >
                Sucesso!
              </div>
            )}
            {errorCd && !showSuccessMessage && (

              <>
                <a
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'red'
                  }}>

                  Usuário existente!
                </a>
              </>
            )}

            {!isLoginPage && (
              <>
                <div
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <Field
                    name="title"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px'
                    }}
                    placeholder="Nome"
                  />
                  <ErrorMessage
                    component="span"
                    name="title"
                    style={{
                      color: 'red',
                      fontSize: '12px'
                    }}
                  />
                </div>

                <div
                  style={{
                    marginBottom: '20px'
                  }}>
                  <Field
                    name="empresa"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px'
                    }}
                    placeholder="Empresa"
                  />
                  <ErrorMessage
                    component="span"
                    name="empresa"
                    style={{
                      color: 'red',
                      fontSize: '12px'
                    }}
                  />
                </div>
              </>
            )}

            <div
              style={{
                marginBottom: '20px'
              }}
            >
              {error && isLoginPage && !showSuccessMessage && (

                <>
                  <a
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      color: 'red'
                    }}>

                    Usuário ou senha incorretos
                  </a>
                </>
              )}
              <Field
                name="email"
                type="email"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
                placeholder="Email"
              />
              <ErrorMessage
                component="span"
                name="email"
                style={{
                  color: 'red',
                  fontSize: '12px'
                }}
              />
            </div>

            <div
              style={{
                marginBottom: '20px'
              }}
            >
              <Field
                name="password"
                type="password"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
                placeholder="Senha"
              />
              <ErrorMessage
                component="span"
                name="password"
                style={{
                  color: 'red',
                  fontSize: '12px'
                }}
              />
            </div>

            <button
              style={{
                width: '107%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'rgb(81 23 74)',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              type="submit">
              {isLoginPage ? 'Entrar' : 'Cadastrar'}
            </button>

            <p
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {!isLoginPage && (
                <div>
                <div
                style={{
                  display:'flex',
                  justifyContent:'center',
                  marginBottom:'10px',
                  color:'white',
                  
                }}>
                Já tem cadastro?{' '}
                </div>
                  <div>
                  <a
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      color:'white',
                      textDecoration: 'underline' ,
                      cursor:'pointer'
                    
                    }}
                     onClick={redirectToLogin}>
                    Clique aqui para fazer login!
                  </a>
                  </div>
                </div>
              )}
              {isLoginPage && (
                <div>
                  <div
                  style={{
                    display:'flex',
                    justifyContent:'center',
                    color:'white',
                 
                  }}>
                  Não tem cadastro?{' '}
                  </div>
                  <div>
                  <a
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      color: 'white',
                      textDecoration: 'underline' ,
                      cursor:'pointer'
                      
                    }}
                    onClick={redirectToCadastro}>
                    Clique aqui para fazer seu Cadastro!
                  </a>
                  </div>
                </div>
              )}

            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Cadastro;
