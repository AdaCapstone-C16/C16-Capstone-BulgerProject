import React, {useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ref, get, child, set } from 'firebase/database';
import {db} from '../firebase'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
import '../components/stylesheets/MyProfile.css'
import '../components/stylesheets/Misc.css'


export default function MyProfile({data}) {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { currentUser, logout, fName, lName } = useAuth()
    const [addSummitPopup, setAddSummitPopup] = useState(false)
    const [myPeakList, setMyPeakList] = useState([])
    
    let peakNames = []
    for (let peak of data) {
        if (peak && peak.indigenous_name) {
            peakNames.push({value:peak.key,label:`${peak.indigenous_name} [${peak.name}]`})
        } else if (peak) {
            peakNames.push({value:peak.key, label:peak.name})
        };
    };

    useEffect(() => {
        getMyPeakData();
        }, []);
    
    const handleAddSummitPopup= () => {
        setAddSummitPopup(true)
    }
    
    const handleAddSummit = (summit) => {
        setError('')
        get(child(ref(db), `users/${currentUser.uid}/summits/${summit[0]}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('This summit is already in your summits')
                setError('This summit already exists in your profile')
            } else {
                set(ref(db, `users/${currentUser.uid}/summits/${summit[0]}`), {name:summit[1]})
                getMyPeakData()
            }
        })}
        
    const handleExitError = () => {
        setError('')

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
                        <button onClick={handleAddSummitPopup}>ADD A SUMMIT</button>
                        <AddSummit trigger={addSummitPopup} setTrigger={setAddSummitPopup} data={peakNames} handleAddSummit={handleAddSummit}></AddSummit>
                    </section>
                    
                </div>
            </section>
            <section id='container-left'>
                {error && <Alert variant="danger">{error}<button onClick={handleExitError}>OK</button></Alert>}
                <section>
                    <MyPeakList peaks={myPeakList} updateList={getMyPeakData} ></MyPeakList>
                </section>
            </section>
        </main>
        );
}