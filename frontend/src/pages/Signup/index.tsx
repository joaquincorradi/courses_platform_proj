import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { FormGroup } from "react-bootstrap";
import "./signup.css";
import Header from "../../components/Header/Header";

function Signup() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(""); // Almacena la respuesta del servidor

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
        console.error("Axios error:", error);
      });
  };

  return (
    <div>
      <Header />
      <Form onSubmit={handleSubmit} className="signup-form">
        <Row className="mb-3">
          <FormGroup as={Col} controlId="formGridName">
            <Form.Label>Ingrese su nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup as={Col} controlId="formGridLastname">
            <Form.Label>Ingrese su apellido:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </FormGroup>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
            <Form.Label>Ingrese su email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="me@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Nunca compartiremos su correo con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridPassword">
            <Form.Label>Cree una contraseña:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Utilice 8 caracteres como mínimo.
            </Form.Text>
          </Form.Group>
        </Row>

        <p className="have-account">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </p>

        <Button variant="primary" type="submit">
          Crear cuenta
        </Button>
      </Form>
      <Card body>{response}</Card>
    </div>
  );
}

export default Signup;
