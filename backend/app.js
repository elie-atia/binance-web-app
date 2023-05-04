import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes/index.route.js';
import webSocket from './utils/websocket.js';
import db from './utils/db.js';



const app = express();
const server = http.createServer(app);
const PORT = 3001;

db.connect();

app.use(cors());
app.use(express.json());
app.use('/', routes);

webSocket.init(server);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.listen(3002, () => {
  console.log('Server listening on port 3002');
});