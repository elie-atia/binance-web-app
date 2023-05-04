import mongoose from 'mongoose';


// URL de connexion à MongoDB
const url = 'mongodb://localhost:27017/my_db';


const connect = () => {
    // Connexion à MongoDB avec Mongoose
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connecté à MongoDB avec Mongoose');
        })
        .catch((err) => {
            console.error('Erreur de connexion à MongoDB :', err);
        });
}

export default {
    connect,
  };

