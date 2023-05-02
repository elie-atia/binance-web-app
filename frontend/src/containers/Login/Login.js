import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Input, Button } from '../../components/SharedStyles';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../state/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = !!authState.token;


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // Remplacez par la valeur du champ email
        password: password, // Remplacez par la valeur du champ mot de passe
      }),
    });

    if (response.ok) {
      // Connexion réussie, traitez la réponse
      const data = await response.json();
      const token = data.token; // Assurez-vous que le token est dans la réponse

      // Stockez le jeton et mettez à jour l'état de l'application
      dispatch(loginSuccess(token));
    } else {
      // Affichez une erreur si le statut de la réponse n'est pas OK
      console.error(`Erreur lors de la connexion: ${response.status}`);
    }
  };

  return (
    <div>
    {isLoggedIn ? (
      <p>Bienvenue, utilisateur connecté!</p>
    ) : (
      <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
    )}
  </div>
    
  );


}

export default Login;