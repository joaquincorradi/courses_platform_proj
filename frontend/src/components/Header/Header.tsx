import "./header.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Para saber si el usuario está autenticado
  const [isAdmin, setIsAdmin] = useState(false); // Para saber si el usuario es administrador

  // Verificar si el usuario está autenticado y si es administrador
  useEffect(() => {
    const token = Cookies.get("token");
    const adminStatus = Cookies.get("isAdmin") === "true";
    setIsAuthenticated(!!token);
    setIsAdmin(adminStatus);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="../../public/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Courses Platform
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/courses">Cursos</Nav.Link>
              {isAdmin && <Nav.Link href="/admin">Administrar cursos</Nav.Link>}
              {!isAdmin && isAuthenticated && (
                <Nav.Link href="/my-courses">Mis Cursos</Nav.Link>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar..."
                className="me-2"
                aria-label="Buscar"
              />
            </Form>
            <Nav className="d-flex, justify-content-around">
              {isAuthenticated ? (
                <>
                  <Button href="/profile" variant="outline-primary">
                    Perfil
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline-danger"
                    className="ms-2"
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/login" variant="outline-primary">
                    Iniciar sesión
                  </Button>
                  <Button href="/signup" variant="primary" className="ms-2">
                    Registrarse
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
