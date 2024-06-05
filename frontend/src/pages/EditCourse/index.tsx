import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";

function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [category, setCategory] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        const course = response.data.course;
        setTitle(course.title);
        setDescription(course.description);
        setRequirements(course.requirements);
        setStartDate(course.start_date);
        setEndDate(course.end_date);
        setRating(course.rating);
        setCourseImage(course.course_image);
        setCategory(course.category);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    axios
      .post("http://localhost:8080/courses/edit", {
        token,
        id: Number(id),
        title,
        description,
        requirements,
        start_date: startDate,
        end_date: endDate,
        rating,
        course_image: courseImage,
        category,
      })
      .then(() => {
        setToastMessage("Curso editado exitosamente");
        setShowToast(true);
        setTimeout(() => navigate("/dashboard"), 3000);
      })
      .catch((error) => {
        console.error("Error editing course:", error);
        setToastMessage("Error al editar el curso");
        setShowToast(true);
      });
  };

  return (
    <Container className="courses-container">
      <Header />
      <Title title="Editar Curso" />
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
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>Fecha de Fin</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Puntaje</Form.Label>
          <Form.Control
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
          Editar Curso
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

export default EditCourse;
