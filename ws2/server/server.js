const express = require('express');

const app = express();

const chat = require('./chat/chat');

app.get("/", (req, res) => {
  const client_ids = chat.get_client_ids();
  
  res.send("<h2>Usuaris online:</h2><ul>" + client_ids.map((id) => `<li>${id}</li>`).join('') + "</ul>");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});