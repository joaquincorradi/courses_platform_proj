import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "react-bootstrap/Button";
import { Alert, Container, Card, Row, Col } from "react-bootstrap";
import "./profile.css";

function Profile() {
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setError("No token found");
      return;
    }

    axios
      .post("http://localhost:8080/users", { token })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        setError("Error fetching profile: " + error.message);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <Container>
      <Header />
      {error ? (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      ) : (
        <Row className="justify-content-center mt-5">
          <Col md={6} className="mt-9">
            <Card className="profile-card">
              <Card.Header className="text-center card-title">
                Información del Perfil
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Nombre:</strong> {profile.name}
                </Card.Text>
                <Card.Text>
                  <strong>Apellido:</strong> {profile.lastname}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {profile.email}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button onClick={handleLogout} variant="outline-danger">
                    Cerrar sesión <i className="bi bi-box-arrow-right"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Footer />
    </Container>
  );
}

export default Profile;
