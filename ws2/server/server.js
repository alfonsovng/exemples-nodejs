const express = require('express');

const app = express();

const Chat = require('./chat/chat');
const chat = new Chat("localhost", 8080);

app.get("/", (req, res) => {
  const client_ids = chat.get_client_ids();
  
  res.send("<ul>" + client_ids.map((id) => `<li>${id}</li>`).join('') + "</ul>");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});