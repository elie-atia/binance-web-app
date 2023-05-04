import { WebSocketServer,WebSocket } from "ws";

const binanceAllTickerWebSocket = new WebSocket('wss://stream.binance.com:9443/stream?streams=!ticker@arr');

binanceAllTickerWebSocket.on('error', (err) => {
    console.error('Erreur de connexion WebSocket Binance:', err);
});

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


const init = (app) => {
    app.ws('/allTickerWs', (clientSocket, req) => {
        console.log('Client connected to allTickerWs');

        binanceAllTickerWebSocket.on('message', (message) => {
            const data = JSON.parse(message);
            const processedData = getTickerBySymbol(data);
            // console.log('Data sent:', processedData); // Ajouter cette ligne
            clientSocket.send(JSON.stringify(processedData));
        });

        clientSocket.on('close', () => {
            console.log('Client disconnected');
        });
    });


    app.ws('/streamWs', (clientSocket, req) => {
        console.log('Client connected to streamWs');
        const url = new URL(req.url, `ws://${req.headers.host}`);
        const streams = url.searchParams.get("streams");
        const binanceStreamWebSocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

        binanceStreamWebSocket.on('message', (message) => {
            const data = JSON.parse(message);
            clientSocket.send(JSON.stringify(data));
        });

        clientSocket.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

export default {
    init,
  };


