const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3001;

const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443/stream?streams=!ticker@arr');

const getTickerBySymbol = (data) => {
  let ticker = {};  
  data?.forEach(item => {
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
  return ticker;
}

wss.on('connection', (clientSocket) => {
  console.log('Client connected');

  binanceWebSocket.on('message', (message) => {
    clientSocket.send(message);
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


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});