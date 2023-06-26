import { useState } from "react";

export default function Input({ onInputSend }) {
  const [input, setInput] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    onInputSend(input);
    setInput("");
  };
  return (
    <div className="Input">
      <form onSubmit={handleFormSubmit}>
        <label>
          <input
            value={input}
            placeholder="Your message goes here"
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </label>
        <button>Send message</button>
      </form>
    </div>
  );
}
