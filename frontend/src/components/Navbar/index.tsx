import "./header.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .post(
          "http://localhost:8080/users/validate",
          { token },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.isAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((error) => {
          console.error("Error checking admin status:", error);
        });
    }
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="../../public/logo_dark.png"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/courses">Cursos</Nav.Link>
              {isLoggedIn && (
                <>
                  <Nav.Link href={isAdmin ? "/dashboard" : "/mycourses"}>
                    {isAdmin ? "Administrar cursos" : "Mis cursos"}
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav className="d-flex, justify-content-around">
              {!isLoggedIn ? (
                <>
                  <Button href="/login" variant="outline-primary">
                    Iniciar sesión
                  </Button>
                  <Button href="/signup" variant="primary" className="ms-2">
                    Registrarse
                  </Button>
                </>
              ) : (
                <Button href="/profile" variant="outline-primary">
                  Perfil
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
