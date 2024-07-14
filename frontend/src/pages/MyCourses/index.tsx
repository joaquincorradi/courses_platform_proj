import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyCourseCard from "../../components/MyCourseCard";
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
}

function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8080/my_courses", { token })
        .then((response) => {
          setCourses(response.data.courses);
        })
        .catch((error) => {
          setError("Error fetching enrolled courses: " + error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("No se encontró token de usuario");
      setIsLoading(false);
    }
  }, [token]);

  return (
    <Container>
      <Header />
      <Title title="Mis cursos" />
      {isLoading ? (
        <Spinner animation="border" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col
              key={course.id}
              sm={12}
              md={6}
              lg={4}
              className="d-flex align-items-stretch"
            >
              <MyCourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                requirements={course.requirements}
                courseImage={course.course_image}
                category={course.category}
              />
            </Col>
          ))}
        </Row>
      )}
      <Footer />
    </Container>
  );
}

export default MyCourses;
