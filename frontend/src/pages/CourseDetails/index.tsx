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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
import "./courseDetails.css";

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
}

function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        const { course, comments } = response.data;
        setCourse(course);
        setComments(comments);
      })
      .catch((error) => {
        setError("Error fetching course details: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const fetchAverageRating = () => {
    axios
      .post(`http://localhost:8080/comments/rating`, { course_id: Number(id) })
      .then((response) => {
        setAverageRating(response.data.average_rating);
      })
      .catch((error) => {
        console.error("Error fetching average rating: " + error.message);
      });
  };

  useEffect(() => {
    fetchAverageRating();
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
        course_id: Number(id),
        comment: newComment,
        rating: newRating || 0,
      })
      .then(() => {
        setToastMessage("Comentario agregado exitosamente");
        setShowToast(true);
        setNewComment("");
        setNewRating(0);
        // Recargar comentarios y actualizar el rating
        axios
          .get(`http://localhost:8080/courses/${id}`)
          .then((response) => {
            const { comments } = response.data;
            setComments(comments);
            fetchAverageRating();
          })
          .catch((error) => {
            setError("Error fetching course details: " + error.message);
          });
      })
      .catch((error) => {
        setToastMessage("Ya has comentado en este curso o no estás inscripto.");
        setShowToast(true);
        console.log(error);
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
    <Container className="courses-container">
      <Header />
      <Title title={course.title} />
      <Card className="mb-3">
        <Row>
          <Col md={4}>
            <Card.Img
              variant="top"
              src={course.course_image}
              alt={course.title}
              className="course-image"
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <Card.Text>
                <strong>Requisitos:</strong> {course.requirements}
              </Card.Text>
              <Card.Text>
                <strong>Categorías:</strong> {categories}
              </Card.Text>
              <Card.Text>
                {averageRating !== null ? (
                  <ReactStars
                    count={5}
                    value={averageRating}
                    edit={false}
                    size={40}
                    color2={"#ffd700"}
                  />
                ) : (
                  <ReactStars
                    count={5}
                    value={0}
                    edit={false}
                    size={40}
                    color2={"#ffd700"}
                  />
                )}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Title title="Comentarios" />
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
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
            size={30}
            color2={"#ffd700"}
            half={false}
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
        className="custom-toast position-fixed bottom-0 end-0 m-3"
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
