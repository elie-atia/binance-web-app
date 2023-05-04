import express from 'express';
import jwt from 'jsonwebtoken';
import checkDatabaseConnection from '../middlewares/checkDatabaseConnection.js';
import User from '../models/User.js';

const router = express.Router();

const SECRET_KEY = 'votre_clé_secrète';


router.post('/login', checkDatabaseConnection, async function (req, res) {
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

router.post('/signup', checkDatabaseConnection, async function (req, res) {
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


export default router;
