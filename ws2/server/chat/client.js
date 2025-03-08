const WebSocket = require('ws');

class Client {
    constructor(id, ws) {
        this.id = id;
        this.ws = ws;

        console.log("Client with id:", this.id, "is connected.");
    }

    send(json) {
        if (this.ws.readyState === WebSocket.OPEN) {
            console.log("Sending message:", json, "to client with id:", this.id);
            this.ws.send(JSON.stringify(json));
            return true;
        } else {
            console.log("Client with id:", this.id, "is not connected.");
            return false;
        }
    }
}

//exporto la classe Client
module.exports = Client;