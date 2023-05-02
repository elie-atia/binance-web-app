import React, { useState, useRef, useEffect } from 'react';
import {Container, Form, Input, Button} from '../../components/SharedStyles';


function Signup() {
    return (
        <Container>
            <Form>
                <h2>Signup</h2>
                <Input type="text" placeholder="Name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm Password" />
                <Button type="submit">Sign up</Button>
            </Form>
        </Container>
    );


}

export default Signup;