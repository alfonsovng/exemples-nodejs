const WebSocket = require('ws');
const Client = require('./client');

class Chat {

    constructor(wshost, wsport) {
        this.client_map = new Map();

        const wss = new WebSocket.Server({ host: wshost, port: wsport });
        console.log("Websocket server started at host", wshost, "and port", wsport);
    
        // WebSocket event handling
        wss.on('connection', (ws, request) => this.on_connection(ws, request));
    }

    get_client_ids() {
        return Array.from(this.client_map.keys());
    }

    on_connection(ws, request) {
        const client = this.create_client(ws, request);

        //guardo el client en el map
        this.client_map.set(client.id, client);

        // Event listener for incoming messages
        ws.on('message', (message) => this.on_message(client, JSON.parse(message)));
    
        // Event listener for client disconnection
        ws.on('close', () => this.remove_client(client));
    }

    on_message(client, json) {
        console.log('Received message:', json, "from client with id:", client.id);
        
        json.from = client.id;

        if(json.to === "all") {
            //envio el missatge a tothom menys al client que l'ha enviat
            this.client_map.forEach((dst_client) => {
                if(dst_client.id !== client.id) {
                    const is_client_alive = dst_client.send(json);
                    if(!is_client_alive) {
                        //compte amb això: https://stackoverflow.com/q/35940216
                        this.remove_client(dst_client);
                    }
                }
            }); 
        } else {
            const dst_client = this.client_map.get(json.to);
            if(dst_client) {
                const is_client_alive = dst_client.send(json);
                if(!is_client_alive) {
                    this.remove_client(dst_client);
                }
            } else {
                console.log('Client with id:', json.to, 'not found.');
            }
        }
    }

    remove_client(client) {
        console.log('Client with id:', client.id, 'is disconnected.');
        this.client_map.delete(client.id);
    }
    
    create_client(ws, request) {
        //split the text by / and get the last element
        const id = request.url.split('/').pop();
        console.log('A new client is connected with id:', id);

        // Create a new client object
        return new Client(id, ws);
    }
}

//exporto la classe Chat
module.exports = Chat
