import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const orderSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    symbol: { type: String, required: true },
    side: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    userMail:{ type: String, required: true },
  });
  
  
  
  // Création d'un modèle à partir du schéma
  const Order = mongoose.model('Order', orderSchema);
  
  export default Order;
  