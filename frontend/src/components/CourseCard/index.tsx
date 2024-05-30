import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface CourseCardProps {
  title: string;
  description: string;
  requirements: string;
  startDate: string;
  endDate: string;
  rating: number;
  image: string;
}

function CourseCard({
  title,
  description,
  requirements,
  startDate,
  endDate,
  rating,
  image,
}: CourseCardProps) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Requerimientos:</strong> {requirements}
        </Card.Text>
        <Card.Text>
          <strong>Fecha de inicio:</strong> {startDate}
        </Card.Text>
        <Card.Text>
          <strong>Fecha de fin:</strong> {endDate}
        </Card.Text>
        <Card.Text>
          <strong>Rating:</strong> {rating}
        </Card.Text>
        <Button variant="primary">Ver curso</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
