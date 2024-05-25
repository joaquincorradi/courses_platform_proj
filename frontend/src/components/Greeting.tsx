import { useEffect } from "react";
import axios from "axios";

function Greeting() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/greet") // Se hace una petición GET al endpoint especificado
      .then((response) => {
        // Manejo de la respuesta
        console.log(response.data); // Se imprime en consola el mensaje recibido
      })
      .catch((error) => {
        // Manejo de errores
        console.error("Axios error:", error); // Se imprime en consola el error
      });
  }, []); // Se pasa un arreglo vacío para que se ejecute solo una vez
  return null; // Devuelve null porque no se necesita renderizar nada
}

export default Greeting;
