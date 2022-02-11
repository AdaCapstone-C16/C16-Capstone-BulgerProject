import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import '../components/stylesheets/Login.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/my-profile")
        } catch (error) {
            console.log(error)
            setError('Failed to access account')
        }
        setLoading(false)
        
    }
    
return (
    <section>
        <Card id="login-card">
            <Card.Body>
                <h2 className='login text-center mb-4'> Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label className="login login-label">Email</Form.Label>
                        <Form.Control className="form-field" type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label className="login login-label">Password</Form.Label>
                        <Form.Control className="form-field" type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    
                    <Button 
                        disabled={loading} 
                        id="login-button"
                        className="login login-label w-100 text-center mt-2"
                        type="submit">Login
                    </Button>

                </Form>
                <div className="w-100 text-center mt-3">
                <Link className="login login-label" to='/forgot-password'>Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to='/signup'>Signup</Link>
        </div>
    </section>
    
    )
}