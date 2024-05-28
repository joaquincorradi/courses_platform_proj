import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./login.css";
import Header from "../../components/Header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState(""); // Almacenar el email
  const [password, setPassword] = useState(""); // Almacenar la contraseña
  const [error, setError] = useState(""); // Almacenar errores

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar que el formulario recargue la página
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then((response) => {
        const { token, isAdmin } = response.data;
        Cookies.set("token", token); // Almacenar el token en una cookie
        Cookies.set("isAdmin", isAdmin.toString()); // Almacenar si el usuario es admin en una cookie
        window.location.href = "/"; // Redirigir al inicio después de iniciar sesión
      })
      .catch(function (error) {
        console.log();
        if (error.response?.status === 401) {
          // Si el error es de autenticación
          console.error(error.response);
          console.error(error.response.data);
          setError("Email o contraseña incorrecta.");
        } else if (error.response?.status === 400) {
          // Si el error es de datos incorrectos
          console.error(error.response);
          console.error(error.response.data);
          setError("Ingrese contraseña y email.");
        }
      });
  };

  return (
    <div>
      <Header />
      <Form onSubmit={handleSubmit} className="login-form">
        <FormGroup>
          <Form.Label>Ingrese su email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="me@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Ingrese su contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <p className="have-account">
          ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
        </p>

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      </Form>
    </div>
  );
}

export default Login;
