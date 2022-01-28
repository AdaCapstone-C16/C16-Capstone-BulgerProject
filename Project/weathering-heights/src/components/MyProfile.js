import React, {useState} from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import AddPeak from './AddPeak';
import MyPeakList from './MyPeakList';
import MyStats from './MyStats'
import { Link, useNavigate } from 'react-router-dom'
import { get, ref, set, child } from "firebase/database";
import { db } from '../firebase'

export default function MyProfile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const dbRef = ref(db);
    get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('This user is in the db!')
        } else {
            set(ref(db, 'users/'+ currentUser.uid), {email:currentUser.email})
        }
    }).catch((error) => {
        console.log(error)
    });
    
    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to log out')
        }
    }

    return (
    <section>
        <h1>My Profile</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {JSON.stringify(currentUser.uid)}
        <div className="w-100 text-center mt-2">
                <Button varient="link" onClick={handleLogout}> Log Out</Button>
        </div>
        <section>
            <MyPeakList></MyPeakList>
        </section>
        <section>
            <AddPeak></AddPeak>
            <MyStats></MyStats>
        </section>
    </section>
        );
}