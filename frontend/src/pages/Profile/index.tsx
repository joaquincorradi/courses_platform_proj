import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setError("No token found");
      return;
    }

    axios
      .get("http://localhost:8080/users/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch profile");
        console.error("Axios error:", error);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("isAdmin");
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <h2>Profile</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}
      <Button onClick={handleLogout} variant="outline-danger" className="ms-2">
        Cerrar sesión
      </Button>
    </>
  );
}

export default Profile;
