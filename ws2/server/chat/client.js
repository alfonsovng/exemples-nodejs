const WebSocket = require('ws');

class Client {
    constructor(ws) {
        this.id = -1;
        this.ws = ws;
    }

    set_id(id) {
        this.id = id;
        console.log("Client with id:", this.id, "is connected.");
    }

    send(json) {
        if (this.ws.readyState === WebSocket.OPEN && this.id >=0) {
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