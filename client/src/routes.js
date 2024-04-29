import { Routes, Route, Navigate } from "react-router";
import React, { useState } from "react";
import Cadastro from './Cadastro';
import Home from "./Home";

function MainRoutes() {
  const [isCadastroCompleto, setIsCadastroCompleto] = useState(false);

  const handleCadastroCompleto = () => {
    setIsCadastroCompleto(true);
  };

  return (
    <Routes>
      <Route 
      path='/'
        element=
        {
          <Cadastro
            onCadastroCompleto={handleCadastroCompleto}
          />
        }
      />
      <Route
        path="/Home"
        element={
          isCadastroCompleto ?
            <Home /> :
            <Navigate to="/"
            />
        }
      />

    </Routes>
  );
}

export default MainRoutes;
