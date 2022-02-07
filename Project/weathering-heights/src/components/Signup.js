import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useNavigate} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleSubmit(event) {
        event.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log(error)
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, fNameRef.current.value, lNameRef.current.value)
            navigate("/thanks")
        } catch (error){
            setError('Failed to create an account')
            console.log(error)
        } 
        // console.log(currentUser.uid)
        setLoading(false)
        
    }
    
    return (
    <section>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'> Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='fname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" ref={fNameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='lname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" ref={lNameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 text-center mt-2" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to='/login'>Login</Link>
        </div>
    </section>
    
    )
}