import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./login.css";
import Header from "../../components/Header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then((response) => {
        const { token, isAdmin } = response.data;
        Cookies.set("token", token);
        Cookies.set("isAdmin", isAdmin.toString());
        window.location.href = "/"; // Redirigir al inicio después de iniciar sesión
      })
      .catch((error) => {
        setError("Login failed. Please check your credentials and try again.");
        console.error("Axios error:", error);
      });
  };

  return (
    <div>
      <Header />
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      </Form>
    </div>
  );
}

export default Login;
