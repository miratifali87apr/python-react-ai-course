import styles from "./messageList.module.css";
import React, { useState } from "react";

const MessageList = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the server");
      }

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message: userMessage },
        { sender: "bot", message: data.response},
      ]);
  
      setUserMessage("");

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }

    
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Chat with GPT</h1>
      <div className={styles.chatBox}>
        {chatHistory.map((chat, index) => (
            <div 
                key={index}
                className={`${styles.message} ${chat.sender == "user" ? styles.userMessage : styles.botMessage}`}
            >
                {chat.message}
            </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input 
            type="text"
            placeholder="Type a message..."
            value = {userMessage}
            onChange = {(e) => setUserMessage(e.target.value)}
            className={styles.input}
        />
        <button onClick = {sendMessage} className={styles.button}>
            Send
        </button>
      </div>
    </div>
  );
};

export default MessageList;
