const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./User');

const SECRET_KEY = 'votre_clé_secrète';

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


module.exports = User;



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

// Ajoutez le gestionnaire d'erreur ici
binanceWebSocket.on('error', (err) => {
  console.error('Erreur de connexion WebSocket Binance:', err);
});

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

app.get('/users', checkDatabaseConnection, async function (req, res) {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.post('/login', checkDatabaseConnection, async function (req, res) {
  const { email, password } = req.body;
  try {
    console.log('flag 1')

    const user = await User.findOne({ email });
    if (!user) {
      console.log('flag 2')
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    console.log('flag 3')

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('flag 4')
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
       // Générer un token JWT contenant l'ID de l'utilisateur
       const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
    res.status(200).json({
      message: 'Connexion réussie',
      token, // Envoyer le token au client
      // Vous pouvez ajouter d'autres informations sur l'utilisateur ici
    });

  } catch (err) {
    console.log('flag 5')
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.post('/signup', checkDatabaseConnection, async function (req, res) {
  const { name, email, password } = req.body;
  try {

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({
      message: 'Inscription réussie',
      // Vous pouvez ajouter d'autres informations sur l'utilisateur ici
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});