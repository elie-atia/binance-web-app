import express from 'express';
import checkDatabaseConnection from '../middlewares/checkDatabaseConnection.js';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/placeOrder', checkDatabaseConnection, async function (req, res) {
    const { token, totalParams } = req.body;
    try {
        console.log(token, totalParams);
        const urlParams = new URLSearchParams(totalParams);
        const symbol = urlParams.get('symbol');
        const side = urlParams.get('side');
        const quantity = urlParams.get('quantity');
        const price = urlParams.get('price');
        const timestamp = urlParams.get('timestamp');
        const userMail = "ee@gmail.com"

        const newOrder = new Order({ timestamp, symbol, side, quantity, price, userMail });

        await newOrder.save();
        res.status(201).json({
            message: 'Nouvel Ordre réussie',
        });
    } catch (err) {
        console.log('flag 5', err)
        res.status(500).json({ error: "Erreur lors du placement d'un nouvelle ordre" });
    }
});


router.get('/orders', checkDatabaseConnection, async function (req, res) {
    try {
        const orders = await Order.find().exec();
        res.send(orders);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des ordres" });
    }
});

export default router;
