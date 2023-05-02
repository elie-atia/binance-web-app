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
const url = 'mongodb://localhost:27017/ma_base_de_donnees';

// Connexion à MongoDB avec Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB avec Mongoose');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

  const personneSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    age: Number
  });

  // Création d'un modèle à partir du schéma
const Personne = mongoose.model('Personne', personneSchema);

  // Documents à ajouter
const documents = [
  new Personne({ nom: 'Dupont', prenom: 'Jean', age: 28 }),
  new Personne({ nom: 'Martin', prenom: 'Marie', age: 32 }),
  new Personne({ nom: 'Durand', prenom: 'Pierre', age: 45 }),
];

// Fonction pour ajouter des documents et les afficher
async function ajouterEtAfficherPersonnes() {
  // Ajouter les documents à la collection 'personnes'
  const result = await Personne.insertMany(documents);
  console.log('Documents ajoutés :', result);

  // Récupérer et afficher les documents
  const personnes = await Personne.find();
  console.log('Documents dans la collection personnes :', personnes);
}

// Appeler la fonction ajouterEtAfficherPersonnes
ajouterEtAfficherPersonnes();

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

app.get('/users', function (req, res) {
  const db = client.db('mydb');
  const collection = db.collection('users');
  collection.find().toArray(function (err, users) {
    if (err) throw err;
    res.send(users);
  });
});

app.post('/users', function (req, res) {
  const db = client.db('mydb');
  const collection = db.collection('users');
  const newUser = req.body;
  collection.insertOne(newUser, function (err, result) {
    if (err) throw err;
    res.send(result.ops[0]);
  });
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});