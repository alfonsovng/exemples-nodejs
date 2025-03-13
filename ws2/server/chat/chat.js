const WebSocket = require('ws');
const Client = require('./client');

class Chat {

    constructor(wshost, wsport) {
        this.client_map = new Map();

        const wss = new WebSocket.Server({ host: wshost, port: wsport });
        console.log("Websocket server started at host", wshost, "and port", wsport);
    
        // WebSocket event handling
        wss.on('connection', (ws) => this.on_connection(ws));
    }

    get_client_ids() {
        return Array.from(this.client_map.keys());
    }

    on_connection(ws) {
        const client = new Client(ws);

        // Event listener for incoming messages
        ws.on('message', (message) => this.on_message(client, JSON.parse(message)));
    
        // Event listener for client disconnection
        ws.on('close', () => this.remove_client(client));
    }

    on_message(client, json) {
        console.log('Received message:', json, "from client with id:", client.id);

        if(json.type === 'auth') {
            if(client.id < 0) {
                client.set_id(json.clientId);
                this.client_map.set(client.id, client);
                return;
            } else {
                console.log('Client with id:', client.id, 'already authenticated.');
                return;
            }
        } else if(json.type == 'chat') {
            if(client.id < 0) {
                console.log('Client not authenticated.');
                return;
            }

            //afegim el client que ha enviat el missatge
            json.from = client.id;

            const dst_client = this.client_map.get(json.to);
            if(dst_client) {
                //envio el missatge al client origen, és més fàcil fer que el client
                //revi tots els missatges i els mostri a la pantalla
                client.send(json);

                const is_client_alive = dst_client.send(json);
                if(!is_client_alive) {
                    this.remove_client(dst_client);
                }
            } else {
                console.log('Client with id:', json.to, 'not found.');
            }
        } else {
            console.log('Unknown message type:', json.type);
        }
    }

    remove_client(client) {
        console.log('Client with id:', client.id, 'is disconnected.');
        this.client_map.delete(client.id);
    }
}

//exporto una instancia de la clase Chat
module.exports = new Chat('localhost', 8080);
