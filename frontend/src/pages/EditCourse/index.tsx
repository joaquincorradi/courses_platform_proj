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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ReactStars from "react-stars";
import Cookies from "js-cookie";

interface Comment {
  user_name: string;
  comment: string;
  rating: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  requirements: string;
  course_image: string;
  category: string;
  comments?: Comment[];
}

function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

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

  const handleCommentSubmit = () => {
    const token = Cookies.get("token");

    if (!token) {
      setError("No token found");
      return;
    }

    axios
      .post("http://localhost:8080/comments", {
        token,
        course_id: id,
        comment: newComment,
        rating: newRating,
      })
      .then(() => {
        setToastMessage("Comentario agregado exitosamente");
        setToastVariant("success");
        setShowToast(true);
        setNewComment("");
        setNewRating(0);
        // Recargar comentarios
        axios
          .get(`http://localhost:8080/courses/${id}`)
          .then((response) => {
            setCourse(response.data.course);
          })
          .catch((error) => {
            setError("Error fetching course details: " + error.message);
          });
      })
      .catch((error) => {
        setToastMessage("Error al agregar comentario: " + error.message);
        setToastVariant("danger");
        setShowToast(true);
      });
  };

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
      <Title title="Comentarios" />
      {course.comments && course.comments.length > 0 ? (
        course.comments.map((comment, index) => (
          <Card className="mb-3" key={index}>
            <Card.Body>
              <Card.Title>{comment.user_name}</Card.Title>
              <Card.Text>{comment.comment}</Card.Text>
              <ReactStars
                count={5}
                value={comment.rating}
                edit={false}
                size={24}
                color2={"#ffd700"}
              />
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="info">No hay comentarios aún.</Alert>
      )}
      <Title title="Agregar un comentario" />
      <Form>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Rating</Form.Label>
          <ReactStars
            count={5}
            value={newRating}
            onChange={(newRating) => setNewRating(newRating)}
            size={24}
            color2={"#ffd700"}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCommentSubmit}>
          Enviar comentario
        </Button>
      </Form>
      <Footer />
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={toastVariant}
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}

export default CourseDetails;
