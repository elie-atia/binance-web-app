import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  });
  
  // Méthode pour comparer le mot de passe soumis avec le mot de passe haché stocké
  userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
  // Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
  userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
  // Création d'un modèle à partir du schéma
  const User = mongoose.model('User', userSchema);
  
  export default User;
  