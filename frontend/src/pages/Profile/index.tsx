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

    // console.log("Token found: ", token);

    axios
      .post("http://localhost:8080/users", { token })
      .then((response) => {
        console.log("Response data: ", response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
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
        <Container>
          <p>Nombre: {profile.name}</p>
          <p>Apellido: {profile.lastname}</p>
          <p>Email: {profile.email}</p>
        </Container>
      )}

      <Button onClick={handleLogout} variant="outline-danger" className="ms-2">
        Cerrar sesión
      </Button>
      <Footer />
    </Container>
  );
}

export default Profile;
