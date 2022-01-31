import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import { get, ref, set, child } from "firebase/database";
import { db } from '../firebase'

export default function Signup() {
    const emailRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    // const {  logout } = useAuth()

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
            // await signup(emailRef.current.value, passwordRef.current.value)
            // TO DO: Need a way to associate the first and last name to a user id, and log all in db
            await signup(emailRef.current.value, passwordRef.current.value, fnameRef.current.value, lnameRef.current.value)
            navigate("/my-profile")
        } catch (error){
            setError('Failed to create an account')
            console.log(error)
        } 
        setLoading(false)
        
    }
    
    // const addUserDB = () => {
    //     // const {currentUser} = useAuth()
    //     console.log('made it here')
    //     const dbRef = ref(db);
    //     get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log('This user is in the db!')
    //     } else {
    //         set(ref(db, 'users/'+ currentUser.uid), 
    //         {first_name:fnameRef, 
    //         last_name:lnameRef,
    //             email:currentUser.email})
    //     }
    //     }).catch((error) => {
    //     console.log(error)
    //     });
    //     console.log('made it here too')
    // }
    return (
    <section>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'> Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='fname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" ref={fnameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id='lname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" ref={lnameRef} required></Form.Control>
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