import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import "./adminCourseCard.css"; // Asegúrate de tener un archivo CSS para estilos específicos

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

  const categories = category.split(",").map((cat, index) => (
    <Badge key={index} pill bg="primary" className="me-1">
      {cat.trim()}
    </Badge>
  ));

  return (
    <Card className="course-card-config admin-course-card-config h-100">
      <Card.Img variant="top" src={courseImage} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Requisitos: {requirements}</Card.Text>
        <Card.Text>
          <ReactStars
            count={5}
            value={rating}
            size={24}
            edit={false}
            half={true}
            color2={"#ffd700"}
          />
        </Card.Text>
        <Card.Text>{categories}</Card.Text>
        <div className="admin-course-buttons d-flex justify-content-between">
          <Button
            variant="outline-primary"
            onClick={handleEdit}
            className="me-2"
          >
            Editar <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="danger" onClick={() => onDelete(id)}>
            Borrar <i className="bi bi-file-earmark-minus-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AdminCourseCard;
