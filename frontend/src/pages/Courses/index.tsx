// src/pages/CoursesPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "../../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <Row>
        {courses.map((course: any) => (
          <Col key={course.id} sm={12} md={6} lg={4}>
            <CourseCard
              title={course.title}
              description={course.description}
              requirements={course.requirements}
              startDate={course.startDate}
              endDate={course.endDate}
              rating={course.rating}
              image={course.image}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Courses;
