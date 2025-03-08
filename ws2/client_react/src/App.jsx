import { useState, useEffect } from 'react'

const clientId = Math.floor(Math.random() * 1000);

function App() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  const [to, setTo] = useState('all');
  const [content, setContent] = useState('');

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/' + clientId);

    websocket.onopen = () => {
      console.log('WebSocket is connected');
    };

    websocket.onmessage = (evt) => {
      console.log('Message received:', evt);
      const message = evt.data;
      setMessages( (prevMessages) =>
        [...prevMessages, message]
      );
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({
        to: to,
        content: content
      }));
      setContent('');
    }
  };

  return (
    <div>
      <h1>
        Real-time Updates with WebSockets and React Hooks - Client {clientId}
      </h1>
      {
        messages.map( (message, index) =>    
          <p key={index}>{message}</p>
        )
      }
      <label>Content:<input type="text" value={content} onChange={(event) => setContent(event.target.value)}/></label>
      <br />
      <label>To:<input type="text" value={to} onChange={(event) => setTo(event.target.value)}/></label>
      <br />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App
