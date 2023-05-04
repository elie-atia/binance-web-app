import mongoose from 'mongoose';

const checkDatabaseConnection  = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ error: "La base de données n'est pas connectée" });
    } else {
        next();
    }
};

export default checkDatabaseConnection;