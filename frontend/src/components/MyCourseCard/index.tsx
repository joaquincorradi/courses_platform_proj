import axios from "axios";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./courseCard.css";
import { useEffect } from "react";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  requirements: string;
  courseImage: string;
  category: string;
}

function MyCourseCard({
  id,
  title,
  description,
  requirements,
  courseImage,
  category,
}: CourseCardProps) {
  const categories = category.split(",").map((cat, index) => (
    <Badge key={index} pill bg="primary" className="me-1">
      {cat.trim()}
    </Badge>
  ));
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
    }
  }, []);

  const handleShowDetails = () => {
    console.log("Show details");
  };

  return (
    <>
      <Card className="course-card-config h-100">
        <Card.Img variant="top" src={courseImage} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Requisitos: {requirements}</Card.Text>
          <Card.Text>{categories}</Card.Text>
          <Button variant="primary" onClick={handleShowDetails}>
            Mostrar detalles
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default MyCourseCard;
