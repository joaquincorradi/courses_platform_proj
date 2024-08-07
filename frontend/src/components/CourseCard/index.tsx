import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Cookies from "js-cookie";
import "./courseCard.css";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  requirements: string;
  courseImage: string;
  category: string;
}

function CourseCard({
  id,
  title,
  description,
  requirements,
  courseImage,
  category,
}: CourseCardProps) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8080/my_courses", { token })
        .then((response) => {
          const enrolledCourses = response.data.courses;
          if (
            enrolledCourses.some((course: { id: number }) => course.id === id)
          ) {
            setIsEnrolled(true);
          }
        })
        .catch((error) => {
          console.error("Error checking enrollment:", error);
        });
    }
  }, [id, token]);

  const handleEnroll = () => {
    if (token) {
      axios
        .post("http://localhost:8080/inscription", { token, id })
        .then(() => {
          setIsEnrolled(true);
          setToastMessage("¡Inscripción exitosa!");
          setShowToast(true);
        })
        .catch((error) => {
          console.log(error);
          setToastMessage("Ya está inscripto en este curso.");
          setShowToast(true);
        });
    } else {
      window.location.href = "/login";
    }
  };

  const handleShowDetails = () => {
    navigate(`/courses/${id}`);
  };

  const categories = category.split(",").map((cat, index) => (
    <Badge key={index} pill bg="primary" className="me-1">
      {cat.trim()}
    </Badge>
  ));

  return (
    <>
      <Card className="course-card-config h-100">
        <Card.Img variant="top" src={courseImage} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Requisitos: {requirements}</Card.Text>
          <Card.Text>{categories}</Card.Text>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={handleEnroll}
              disabled={isEnrolled}
            >
              {isEnrolled ? "Inscripto" : "Inscribirse"}
            </Button>
            <Button variant="outline-primary" onClick={handleShowDetails}>
              Mostrar detalles
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={4000}
        autohide
        className="custom-toast position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default CourseCard;
