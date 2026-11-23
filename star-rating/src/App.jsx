import { useState } from "react";
import "./App.css";

function App() {
  // Store selected rating
  const [rating, setRating] = useState(0);

  // Handle star click
  function handleRating(value) {
    setRating(value);
  }

  return (
    <div className="container">
      <h1>Star Rating App</h1>
      <p>Rate our service</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              className={star <= rating ? "active" : "star"}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          );

        })}

      </div>

      <h3>Your Rating: {rating} / 5</h3>

      <button onClick={() => setRating(0)}>
        Reset
      </button>

    </div>
  );
}

export default App;
