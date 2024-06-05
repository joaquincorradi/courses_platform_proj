import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./courseCard.css";
import Cookies from "js-cookie";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  requirements: string;
  rating?: number;
  courseImage: string;
  category: string;
}

function CourseCard({
  title,
  description,
  requirements,
  rating,
  courseImage,
  category,
}: CourseCardProps) {
  const token = Cookies.get("token");

  const handleButtonClick = () => {
    if (token) {
      alert("Inscripción exitosa");
    } else {
      window.location.href = `/login`;
    }
  };

  return (
    <Card className="course-card-config h-100">
      <Card.Img variant="top" src={courseImage} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Requisitos: {requirements}</Card.Text>
        <Card.Text>Puntaje: {rating}</Card.Text>
        <Card.Text>Categoría: {category}</Card.Text>
        <Button variant="primary" onClick={handleButtonClick}>
          Inscribirse
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
