import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [email, setEmail] = useState(""); // Almacena el valor del input de email
  const [password, setPassword] = useState(""); // Almacena el valor del input de password
  const [response, setResponse] = useState(""); // Almacena la respuesta del servidor

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/createUser", { email, password })
      .then((response) => {
        setResponse(response.data.message);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
      <h3>{response}</h3>
    </div>
  );
}

export default CreateUser;
