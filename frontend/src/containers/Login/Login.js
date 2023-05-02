import React, { useState, useRef, useEffect } from 'react';
import {Container, Form, Input, Button} from '../../components/SharedStyles';

function Login() {
    return (
        <Container>
        <Form>
          <h2>Login</h2>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    );


}

export default Login;