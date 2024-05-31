import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login() {
  const [email, setEmail] = useState(""); // Almacenar el email
  const [password, setPassword] = useState(""); // Almacenar la contraseña
  const [error, setError] = useState(""); // Almacenar errores

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar que el formulario recargue la página
    axios
      .post("http://localhost:8080/users/login", { email, password })
      .then((response) => {
        // const { token, isAdmin } = response.data;
        const { token } = response.data;
        Cookies.set("token", token); // Almacenar el token en una cookie
        // Cookies.set("isAdmin", isAdmin.toString()); // Almacenar si el usuario es admin en una cookie
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="form-signin">
          <Form onSubmit={handleSubmit} className="login-form">
            <a href="/">
              <img
                className="mb-4"
                src="../../public/logo.png"
                alt=""
                width="72"
                height="72"
              />
            </a>
            <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
            <FloatingLabel controlId="floatingInput" label="Correo electrónico">
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Contraseña">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>

            <p className="have-account">
              ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
            </p>
            <Button className="btn btn-primary w-100 py-2" type="submit">
              Iniciar sesión
            </Button>
          </Form>
          <div className="display-error-message">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
