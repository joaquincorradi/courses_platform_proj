import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import AdminCourseCard from "../../components/AdminCourseCard";
import Cookies from "js-cookie";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Title from "../../components/Title";

interface Course {
  id: number;
  title: string;
  description: string;
  requirements: string;
  rating: number;
  course_image: string;
  category: string;
}

function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data.courses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeleteCourse = (courseId: number) => {
    const token = Cookies.get("token");
    axios
      .post("http://localhost:8080/courses/delete", { token, id: courseId })
      .then(() => {
        setCourses(courses.filter((course) => course.id !== courseId));
        setToastMessage("Curso eliminado exitosamente");
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        setToastMessage("Error al eliminar el curso");
        setShowToast(true);
      });
  };

  return (
    <Container className="courses-container">
      <Header />
      <Title title="Panel de control del administrador" />
      <div className="create-course-button-container">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/createcourse")}
        >
          Nuevo curso <i className="bi bi-plus-square -lg"></i>
        </Button>
      </div>
      <Row className="gy-4 courses-row-config">
        {isLoading ? (
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          courses.map((course) => (
            <Col
              key={course.id}
              sm={12}
              md={6}
              lg={4}
              className="d-flex align-items-stretch"
            >
              <AdminCourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                requirements={course.requirements}
                rating={course.rating}
                courseImage={course.course_image}
                category={course.category}
                onDelete={handleDeleteCourse}
              />
            </Col>
          ))
        )}
      </Row>
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

export default Dashboard;
