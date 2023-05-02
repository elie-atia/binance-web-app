const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3001;

// URL de connexion à MongoDB
const url = 'mongodb://localhost:27017/my_db';

// Connexion à MongoDB avec Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB avec Mongoose');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

  function checkDatabaseConnection(req, res, next) {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({ error: "La base de données n'est pas connectée" });
    } else {
      next();
    }
  }

  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });

// Création d'un modèle à partir du schéma
const User = mongoose.model('User', userSchema);



const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/stream?streams=!ticker@arr');

const getTickerBySymbol = (data) => {
  let ticker = {};
  if (data && typeof data === 'object') {
    const items = Object.values(data);
    items[1].forEach(item => {
      let symbol = item.symbol || item.s;
      ticker[symbol] = {
        symbol: symbol,
        lastPrice: item.lastPrice || item.c,
        priceChange: item.priceChange || item.p,
        priceChangePercent: item.priceChangePercent || item.P,
        highPrice: item.highPrice || item.h,
        lowPrice: item.lowPrice || item.l,
        quoteVolume: item.quoteVolume || item.q,
      }
    })
  } else {
    console.error('Data is not an object:', data);
  }
  return ticker;
};

wss.on('connection', (clientSocket) => {
  console.log('Client connected');

  binanceWebSocket.on('message', (message) => {
    const data = JSON.parse(message);
    const processedData = getTickerBySymbol(data);
    // console.log('Data sent:', processedData); // Ajouter cette ligne
    clientSocket.send(JSON.stringify(processedData));
  });

  binanceWebSocket.on('error', (err) => {
    console.error('Erreur de connexion WebSocket:', err);
  });

  clientSocket.on('close', () => {
    console.log('Client disconnected');
  });
});



server.listen(3002, () => {
  console.log('Server listening on port 3002');
});


app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', checkDatabaseConnection, async function (req, res) {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.post('/users', checkDatabaseConnection, async function (req, res) {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});