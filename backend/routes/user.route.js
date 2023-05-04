import express from 'express';
import User from '../models/User.js';
import checkDatabaseConnection from '../middlewares/checkDatabaseConnection.js';
const router = express.Router();

router.get('/users', checkDatabaseConnection, async function (req, res) {
    try {
        const users = await User.find().exec();
        res.send(users);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});


export default router;

