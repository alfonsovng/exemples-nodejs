# Exemple de chat bàsic amb websockets

Codi fet a partir d'aquests dos articles:

* https://www.blackslate.io/articles/real-time-communication-with-nodejs-express-websockets
* https://www.geeksforgeeks.org/real-time-updates-with-websockets-and-react-hooks/

En primer lloc, cal iniciar el [server](./server/):

    cd server
    npm install
    npm start

Si es vol fer servir el client bàsic, tan sols cal obrir el fitxer [index.hml](./client_basic/index.html) amb un navegador.

Si es vol fer servir el [client react](./client_react/):

    cd client_react
    npm install
    npm run dev
