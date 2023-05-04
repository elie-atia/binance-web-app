import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes/index.route.js';
import webSocket from './utils/websocket.js';
import db from './utils/db.js';
import expressWs from 'express-ws';


const app = express();
const server = http.createServer(app);
expressWs(app, server);

const PORT = 3001;

db.connect();

app.use(cors());
app.use(express.json());
app.use('/', routes);

webSocket.init(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});