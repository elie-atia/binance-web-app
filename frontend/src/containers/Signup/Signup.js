import React, { useState, useRef, useEffect } from 'react';
import {Container, Form, Input, Button} from '../../components/SharedStyles';


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert('Les mots de passe ne correspondent pas');
          return;
        }
    
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Inscription réussie:', data);
          // Gérer l'inscription réussie ici (rediriger vers une autre page, etc.)
        } else {
          console.error('Erreur lors de l\'inscription:', response.statusText);
        }
      };
    
    return (
        <Container>
      <Form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
            <Button type="submit">Sign up</Button>
            </Form>
        </Container>
    );


}

export default Signup;