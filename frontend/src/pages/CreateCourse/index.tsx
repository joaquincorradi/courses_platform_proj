import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [category, setCategory] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios
      .post("http://localhost:8080/courses/create", {
        token,
        title,
        description,
        requirements,
        start_date: startDate,
        end_date: endDate,
        course_image: courseImage,
        category,
      })
      .then(() => {
        setToastMessage("Curso creado exitosamente");
        setShowToast(true);
        setTimeout(() => navigate("/dashboard"), 3000);
      })
      .catch((error) => {
        console.error("Error creating course:", error);
        setToastMessage("Error al crear el curso");
        setShowToast(true);
      });
  };

  return (
    <Container className="courses-container">
      <Header />
      <Title title="Crear curso" />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="requirements">
          <Form.Label>Requisitos</Form.Label>
          <Form.Control
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>Fecha de Fin</Form.Label>
          <Form.Control
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="courseImage">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            value={courseImage}
            onChange={(e) => setCourseImage(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Crear Curso
        </Button>
      </Form>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="custom-toast position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <Footer />
    </Container>
  );
}

export default CreateCourse;
