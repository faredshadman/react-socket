import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", {
      room,
      message,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Room number"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h1>Received: {messageReceived}</h1>
      </div>
    </div>
  );
}

export default App;
