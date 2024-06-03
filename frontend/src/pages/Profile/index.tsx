import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";
import Button from "react-bootstrap/Button";
import { Alert, Container } from "react-bootstrap";

function Profile() {
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:8080/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      <Title title="Perfil" />

      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <p>Nombre: {profile.first_name}</p>
          <p>Apellido: {profile.last_name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}

      <Button onClick={handleLogout} variant="outline-danger" className="ms-2">
        Cerrar sesión
      </Button>
      <Footer />
    </Container>
  );
}

export default Profile;
