import express from 'express';
import checkDatabaseConnection from '../middlewares/checkDatabaseConnection.js';
import verifyToken from '../middlewares/verifyToken.js';

import Order from '../models/Order.js';

const router = express.Router();

router.post('/placeOrder',verifyToken, checkDatabaseConnection, async function (req, res) {
    const { totalParams } = req.body;
    try {
        const urlParams = new URLSearchParams(totalParams);
        const symbol = urlParams.get('symbol');
        const side = urlParams.get('side');
        const quantity = urlParams.get('quantity');
        const price = urlParams.get('price');
        const timestamp = urlParams.get('timestamp');
        const type = urlParams.get('type');
        const status = "Filled";
        const userId = req.userId;

        const newOrder = new Order({ timestamp, symbol,type, side, quantity, price,status, userId });

        await newOrder.save();
        res.status(201).json({
            message: 'Nouvel Ordre réussie',
        });
    } catch (err) {
        console.log('flag 5', err)
        res.status(500).json({ error: "Erreur lors du placement d'un nouvelle ordre" });
    }
});


router.post('/orderHistory',verifyToken, checkDatabaseConnection, async function (req, res) {
    try {
        const userIdValue = req.userId;
        console.log(userIdValue);
        const orders = await Order.find({ userId: userIdValue }).exec();
        res.send(orders);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des ordres" });
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
