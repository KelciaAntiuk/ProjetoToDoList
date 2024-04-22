import React, { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Home from './Home';

function App() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRegister = async (values) => {
    const { title, empresa, email, password } = values;

    try {
      const user = { title, empresa, email, password };
      await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      setShowSuccessMessage(true);
      // Redirecionar para outra página após o cadastro
      setTimeout(() => {
        window.location.href = './Home';
      }, 3000); // Redirecionar após 3 segundos
    } catch (error) {
      console.error('Error adding people:', error);
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
          Cadastro
        </h1>
        <Formik
          initialValues={{}}
          onSubmit={handleRegister}
          validationSchema={validationsRegister}
        >
          <Form
          style={{
            marginLeft:'-17px'
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

            <div
              style={{
                marginBottom: '20px'
              }}
            >
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
              Cadastrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default App;
