import React from "react";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";


function App() {

  const handleRegister = async (values) => {
    console.log('values', values);
  
    const { title, empresa, email, password } = values; // Extrair os valores do formulário
  
    try {
      const user = { title, empresa, email, password }; // Criar o objeto de usuário com as chaves corretas
      console.log('users', user)
      await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user), // Passar o objeto de usuário como corpo da requisição
      });
  
      console.log('cadastrado com sucesso');
    } catch (error) {
      console.error('Error adding people:', error);
    }
  };
  



  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
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
    <div className="container">

      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">

          <div className="form-group">
            <Field
              name="title"
              className="form-field"
              placeholder="Nome"
            />

            <ErrorMessage
              component="span"
              name="title"
              className="form-error"
            />
          </div>
          <div className="form-group">
            <Field
              name="empresa"
              className="form-field"
              placeholder="Empresa"
            />

            <ErrorMessage
              component="span"
              name="empresa"
              className="form-error"
            />
          </div>



          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>


          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;