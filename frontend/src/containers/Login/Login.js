import React, { useState, useRef, useEffect } from 'react';
import {Container, Form, Input, Button} from '../../components/SharedStyles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login réussi:', data);
      // Gérer la connexion réussie ici (rediriger vers une autre page, etc.)
    } else {
      console.error('Erreur lors de la connexion:', response.statusText);
    }
  };

    return (
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
    );


}

export default Login;