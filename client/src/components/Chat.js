import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input, Button, Typography } from "antd"; // Import necessary components from Ant Design

const socket = io.connect("http://localhost:3000");

const { Title } = Typography; // Extracting Title for convenience

function Chat() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", { message, room });
      setMessage(""); // Clear input after sending
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <Title level={3}>Chat Room</Title>
        <Input
          placeholder="Room Number..."
          className="mb-4"
          onChange={(event) => setRoom(event.target.value)}
        />
        <Button type="primary" onClick={joinRoom} className="mb-4 w-full">
          Join Room
        </Button>
        <Input
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mb-4"
        />
        <Button type="primary" onClick={sendMessage} className="mb-4 w-full">
          Send Message
        </Button>
        <Title level={5}>Message:</Title>
        <div className="border p-4 rounded-md bg-gray-50">
          {messageReceived}
        </div>
      </div>
    </div>
  );
}

export default Chat;
