import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import CourseCard from "../../components/CourseCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  const [courses, setCourses] = useState<Course[]>([]); // Se utiliza un array de objetos de tipo Course

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

  return (
    <Container className="courses-container">
      <Header />
      <h1 className="display-4 fw-bold text-body-emphasis title-config">
        Cursos
      </h1>
      <Row className="gy-4 courses-row-config">
        {courses.map((course) => (
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
        ))}
      </Row>
      <Footer />
    </Container>
  );
}

export default Courses;
