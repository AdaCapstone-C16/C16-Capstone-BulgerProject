import React, {useState, useEffect} from 'react';
import { Button, Container, Col, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import { useNavigate } from 'react-router-dom'
import { ref, onValue, set } from 'firebase/database';
import {db} from '../firebase'
import '../components/stylesheets/MyProfile.css'

export default function MyProfile() {
    const [error, setError] = useState("")
    const { currentUser, logout, fName, lName } = useAuth()
    const navigate = useNavigate()
    const [addSummit, setAddSummit] = useState(false)
    const [myPeakList, setMyPeakList] = useState([])

    const handleAddSummit= () => {
        setAddSummit(true)
    }

    const getMyPeakData = () => {
        const myPeaks = ref(db, `users/${currentUser.uid}/summits`)
        console.log(myPeaks)
        return myPeaks
    }
    
    useEffect(() => {        
        setMyPeakList(getMyPeakData());
    }, []);

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

    <main className='image-background'>
        <section>
            <h1>WEATHERING HEIGHTS</h1>
        </section>
        <section>
            {error && <Alert variant="danger">{error}</Alert>}
            <div>
                <Button varient="link" onClick={handleLogout}> Log Out</Button>
            </div>
            <section>
                <MyPeakList></MyPeakList>
            </section>
            <section>
                <Button onClick={handleAddSummit}>ADD A SUMMIT</Button>
                <AddSummit trigger={addSummit} setTrigger={setAddSummit}></AddSummit>
            </section>
        </section>
    </main>
        );
}