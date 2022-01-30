import React, {useState} from 'react';
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import MyStats from './MyStats'
import { useNavigate } from 'react-router-dom'
import { get, ref, set, child } from "firebase/database";
import { db } from '../firebase'

export default function MyProfile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const dbRef = ref(db);
    const [addSummit, setAddSummit] = useState(false)
    // This block gets the uid, if it is a new user, it will add them to the db
    get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('This user is in the db!')
        } else {
            set(ref(db, 'users/'+ currentUser.uid), {email:currentUser.email})
        }
    }).catch((error) => {
        console.log(error)
    });
    
    const handleAddSummit= () => {
        setAddSummit(true)
    }
    // If the logout button is clicked, it will navigate user to the homepage
    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate("/")
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
            <Button onClick={handleAddSummit}>ADD A SUMMIT</Button>
            <AddSummit trigger={addSummit} setTrigger={setAddSummit}>
            </AddSummit>

            <MyStats></MyStats>
        </section>
    </section>
        );
}