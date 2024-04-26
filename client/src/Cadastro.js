import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";

function Cadastro({ onCadastroCompleto }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCadastroCompleto = () => {
    setShowSuccessMessage(true);
    onCadastroCompleto();
  };

  const redirectWithDelay = () => {
    setTimeout(() => {
      navigate('/Home');
    }, 3000);
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
      // Buscar os dados do usuário através da requisição
      const response = await fetch('http://localhost:3333/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();

      // Encontrar o usuário com o email fornecido
      const user = userData.find(user => user.email === email);

      if (!user) {
        
        setError(true);
        throw new Error('User not found');
      }

      // Comparar a senha fornecida com a senha criptografada do usuário
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log('Login bem-sucedido!');
        redirectWithDelay();
        handleCadastroCompleto();

      } else {
        // Utilize ErrorMessage para mostrar o erro ao cliente
          setError(true);   
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
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

    }}
    >
      <div style={{
        width: '300px',
        padding: '50px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
      }}
      >
        <h1
          style={{
            textAlign: 'center'
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
                  color: 'green',
                  fontSize: '16px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
                Cadastrado com sucesso!
              </div>
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
                      color:'red'
                    }}>
                      
                    Senha ou usuário incorretos
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
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#007bff',
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
                <>
                  Já tem cadastro?{' '}
                  <a
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    href="#" onClick={redirectToLogin}>
                    Clique aqui para fazer login!
                  </a>
                </>
              )}
              {isLoginPage && (
                <>
                  Não tem cadastro?{' '}
                  <a
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    href="#" onClick={redirectToCadastro}>
                    Clique aqui para fazer seu Cadastro!
                  </a>
                </>
              )}

            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Cadastro;
