import React, {useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ref, get, child } from 'firebase/database';
import {db} from '../firebase'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import '../components/stylesheets/MyProfile.css'
import '../components/stylesheets/Misc.css'


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
        let myPeaksArr = []
        const dbRef = ref(db);
        get(child(dbRef, `users/${currentUser.uid}/summits`)).then((snapshot) => {
            snapshot.forEach((peak) => {
                let pID = peak.key
                const pName = peak.child('name').val()
                let pTrips = []
                get(child(dbRef, `users/${currentUser.uid}/summits/${peak.key}/trips`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach((trip)=>{
                            const tripArr = [trip.key,trip.val()]
                            pTrips.push(tripArr)
                        })
                    } else {
                        console.log('There are no associated trips to this summit');
                    }
                }).catch((error) => {
                    console.log(error)
                    return error
                });
                myPeaksArr.push({key:pID, 
                                id:pID,
                                name:pName,
                                trips:pTrips
                            })
                });
            setMyPeakList(myPeaksArr)
        })
        console.log("HERRREEE ISSS THE USSEERRRR")
        console.log(fName, lName)
        }

        
    useEffect(() => {
        getMyPeakData();
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
    const handleHomepage =() => {
        navigate("/")
    }

    return (
    <main id='main'>
        <section id='container-right'>
            <p id='title'>WEATHERING HEIGHTS</p>
            <h4>MY PROFILE</h4>
            <div className=''>
                <section>
                <button onClick={handleHomepage}>HOMEPAGE</button>
                    <button onClick={handleLogout}>LOGOUT</button>
                    <button onClick={handleAddSummit}>ADD A SUMMIT</button>
                    <AddSummit trigger={addSummit} setTrigger={setAddSummit} updateList={getMyPeakData}></AddSummit>
                </section>
                
            </div>
        </section>
        <section id='container-left'>
            {error && <Alert variant="danger">{error}</Alert>}
            <section>
                <MyPeakList peaks={myPeakList} updateList={getMyPeakData} ></MyPeakList>
            </section>
        </section>
    </main>
        );
}