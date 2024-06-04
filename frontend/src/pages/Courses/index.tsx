import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import CourseCard from "../../components/CourseCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "../../components/Title";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "./courses.css";

interface Course {
  id: number;
  title: string;
  description: string;
  requirements: string;
  rating: number;
  course_image: string;
  category: string;
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un spinner mientras se cargan los cursos
  const [hasSearched, setHasSearched] = useState(false); // Para mostrar un mensaje si no se encontraron resultados

  // Se obtienen los cursos al cargar la página
  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Se obtienen los cursos al realizar una búsqueda
  useEffect(() => {
    const searchCourse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/search?q=${search}`
        );
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
        setHasSearched(true);
      }
    };

    if (search) {
      searchCourse();
    }
  }, [search]);

  // Funcion para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Funcion para manejar el envío del formulario de búsqueda
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(query);
  };

  // Funcion para limpiar la búsqueda
  const handleClearSearch = () => {
    setQuery("");
    setSearch("");
    setHasSearched(false);
    // Se realiza otro fetch para obtener todos los cursos nuevamente
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  return (
    <Container className="courses-container">
      <Header />
      <Title title="Cursos" />

      <Form onSubmit={handleSearchSubmit} className="d-flex mb-4">
        <Form.Control
          className="me-2"
          type="text"
          placeholder="Buscar cursos..."
          value={query}
          onChange={handleSearchChange}
        />
        <Button type="submit" className="me-2">
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleClearSearch}>
          Limpiar
        </Button>
      </Form>

      <Row className="gy-4 courses-row-config">
        {isLoading ? (
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : hasSearched && courses.length === 0 ? (
          <Alert variant="info">
            No se encontraron resultados para "{search}"
          </Alert>
        ) : (
          courses.map((course) => (
            <Col
              key={course.id}
              sm={12}
              md={6}
              lg={4}
              className="d-flex align-items-stretch"
            >
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                requirements={course.requirements}
                rating={course.rating}
                courseImage={course.course_image}
                category={course.category}
              />
            </Col>
          ))
        )}
      </Row>
      <Footer />
    </Container>
  );
}

export default Courses;
