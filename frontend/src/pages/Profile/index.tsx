import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Navbar";
import Button from "react-bootstrap/Button";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  // const [error, setError] = useState("");

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
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <h2>Profile</h2>
      <div>
        <p>First Name: {profile.firstName}</p>
        <p>Last Name: {profile.lastName}</p>
        <p>Email: {profile.email}</p>
      </div>
      <Button onClick={handleLogout} variant="outline-danger" className="ms-2">
        Cerrar sesión
      </Button>
    </>
  );
}

export default Profile;
