import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface AdminCourseCardProps {
  id: number;
  title: string;
  description: string;
  requirements: string;
  rating?: number;
  courseImage: string;
  category: string;
  onDelete: (id: number) => void;
}

function AdminCourseCard({
  id,
  title,
  description,
  requirements,
  rating,
  courseImage,
  category,
  onDelete,
}: AdminCourseCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editcourse/${id}`);
  };

  return (
    <Card className="course-card-config admin-course-card-config h-100">
      <Card.Img variant="top" src={courseImage} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Requisitos: {requirements}</Card.Text>
        <Card.Text>Puntaje: {rating}</Card.Text>
        <Card.Text>Categoría: {category}</Card.Text>
        <div className="admin-course-buttons">
          <Button
            variant="outline-primary"
            onClick={handleEdit}
            className="me-2"
          >
            Editar
          </Button>
          <Button variant="danger" onClick={() => onDelete(id)}>
            Borrar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AdminCourseCard;
