import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/greet")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the greeting!", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
};

export default App;
