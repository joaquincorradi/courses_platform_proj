import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

interface Course {
  id: number;
  title: string;
  description: string;
  requirements: string;
  course_image: string;
  category: string;
  rating?: number;
}

function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        setCourse(response.data.course);
      })
      .catch((error) => {
        setError("Error fetching course details: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Header />
        <Title title="Detalles del curso" />
        <Spinner animation="border" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <Footer />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <Title title="Detalles del curso" />
        <Alert variant="danger">{error}</Alert>
        <Footer />
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <Header />
        <Title title="Detalles del curso" />
        <Alert variant="danger">No se encontró el curso</Alert>
        <Footer />
      </Container>
    );
  }

  const categories = course.category
    ? course.category.split(",").map((cat, index) => (
        <Badge key={index} pill bg="primary" className="me-1">
          {cat.trim()}
        </Badge>
      ))
    : null;

  return (
    <Container>
      <Header />
      <Title title={course.title} />
      <Card className="mb-3">
        <Card.Img variant="top" src={course.course_image} alt={course.title} />
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.description}</Card.Text>
          <Card.Text>
            <strong>Requisitos:</strong> {course.requirements}
          </Card.Text>
          <Card.Text>
            <strong>Categorías:</strong> {categories}
          </Card.Text>
        </Card.Body>
      </Card>
      <Footer />
    </Container>
  );
}

export default CourseDetails;
