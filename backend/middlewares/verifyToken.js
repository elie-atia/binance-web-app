import jwt from 'jsonwebtoken';
const SECRET_KEY = 'votre_clé_secrète';

const verifyToken = (req, res, next) =>{
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token non valide.' });
    }
    
    req.userId = decoded.id;
    next();
  });
}

  export default verifyToken;