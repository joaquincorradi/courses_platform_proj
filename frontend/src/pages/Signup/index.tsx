import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Alert } from "react-bootstrap";

function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(""); // Almacena la respuesta del servidor
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/signup", {
        name,
        lastname,
        email,
        password,
      })
      .then((response) => {
        setResponse(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setError("Este correo ya está registrado.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="form-signin">
        <Form onSubmit={handleSubmit} className="login-form">
          <a href="/">
            <img className="mb-4" src="/logo_dark.png" alt="" width="150" />
          </a>
          <h1 className="h3 mb-3 fw-normal">Registrarse</h1>
          <FloatingLabel controlId="floatingInput" label="Nombre">
            <Form.Control
              className="nameSU"
              type="text"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingName" label="Apellido">
            <Form.Control
              className="lastnameSU"
              type="text"
              placeholder="Doe"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Correo electrónico">
            <Form.Control
              className="emailSU"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control
              className="passSU"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>

          <p className="have-account">
            ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
          </p>

          <Button className="btn btn-primary w-100 py-2" type="submit">
            Crear cuenta
          </Button>
          <div className="display-error-message">
            {error && (
              <Alert variant="danger">
                {error} <a href="/login">Iniciar sesión.</a>
              </Alert>
            )}
          </div>
        </Form>

        <div>
          {response && (
            <Alert variant="success">
              {response} Ahora puede <a href="/login">iniciar sesión</a>.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
