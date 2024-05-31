import { Button } from "react-bootstrap";
import "./hero.css";

function Hero() {
  return (
    <div className="px-4 pt-5 my-5 text-center hero-container">
      <h1 className="display-4 fw-bold text-body-emphasis">
        Impulsa tu carrera con keep_conding
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Domina el arte de la programación y transforma tu carrera con nuestros
          cursos interactivos y accesibles. ¡Comienza tu viaje hoy y convierte
          tus ideas en realidad!
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Button
            variant="primary"
            className="btn btn-lg px-4 me-sm-3"
            href="/signup"
          >
            Registrarse
          </Button>
          <Button
            variant="outline-secondary"
            className="btn btn-lg px-4"
            href="/courses"
          >
            Cursos
          </Button>
        </div>
      </div>
      <div className="vh30">
        <div className="container px-5">
          <img
            src="https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="img-fluid border rounded-3 mb-4"
            alt="Hero image"
            width="500"
            height="300"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
