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
  const [showCourses, setShowCourses] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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

  useEffect(() => {
    if (isLoggedIn) {
      setShowCourses(true);
      setShowAdmin(isAdmin);
    }
  }, [isLoggedIn, isAdmin]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo_dark.png"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/courses">Cursos</Nav.Link>
            </Nav>

            <Nav>
              {isLoggedIn ? (
                <>
                  <Button
                    href="/profile"
                    variant="outline-primary"
                    className="me-2"
                  >
                    Perfil <i className="bi bi-person-circle"></i>
                  </Button>
                  {(showCourses || showAdmin) && (
                    <Button
                      href={isAdmin ? "/dashboard" : "/mycourses"}
                      variant="outline-primary"
                    >
                      {isAdmin ? (
                        <div>
                          Administrar cursos{" "}
                          <i className="bi bi-speedometer2"></i>
                        </div>
                      ) : (
                        "Mis cursos"
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    href="/login"
                    variant="outline-primary"
                    className="me-2"
                  >
                    Iniciar sesión
                  </Button>
                  <Button href="/signup" variant="primary">
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
