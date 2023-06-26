import "./App.css";
import Input from "./Input";
import Messages from "./Messages";
import { useState, useEffect } from "react";
import randomStarwarsNames from "random-starwars-names";

const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
};
const randomName = () => {
  return randomStarwarsNames.random();
};
function App() {
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState({
    username: randomName(),
    color: randomColor(),
  });

  useEffect(() => {
    const drone = new window.Scaledrone("", {
      data: user,
    });

    drone.on("open", (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const updatedUser = { ...user, id: drone.clientId };
      setUser(updatedUser);
      const room = drone.subscribe("observable-room");
      room.on("message", (message) => {
        setMessage((prevMessage) => [...prevMessage, message]);
      });
    });
    return () => {
      drone.close();
    };
  }, []);
  const handleInput = (input) => {
    const drone = new window.Scaledrone("");

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      drone.publish({
        room: "observable-room",
        message: { input, user },
      });
    });
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Moja Chat Aplikacija</h1>
      </div>
      <Messages messages={message} users={user} />
      <Input onInputSend={handleInput} />
    </div>
  );
}

export default App;
