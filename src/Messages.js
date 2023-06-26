import React, { useEffect, useRef } from "react";

export default function Messages({ messages, users }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  return (
    <>
      <ul ref={messagesRef}>
        {messages.map((m) => renderMessage(m, users))}
      </ul>
    </>
  );
}
const renderMessage = (messages, users) => {
  const text = messages.data.input;
  const color = messages.data.user.color;
  const id = messages.data.user.id;
  const username = messages.data.user.username;
  const key = messages.timestamp;
  const myMessage = id === users.id;
  const className = myMessage ? "message my-message" : "message other-message";
  return (
    <li className={className} key={key}>
      <span className="user-color" style={{ backgroundColor: color }} />
      <div className="message-body">
        <div className="username">{username}</div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
};
