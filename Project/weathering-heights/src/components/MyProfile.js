import React, {useState, useEffect} from 'react';
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ref, onValue, get, child } from 'firebase/database';
import {db} from '../firebase'
import AddSummit from './AddSummit';
import MyPeakList from './MyPeakList';
// import '../components/stylesheets/MyProfile.css'


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
        const myPeaks = ref(db, `users/${currentUser.uid}/summits`)
        const dbRef = ref(db);

        get(child(dbRef, `users/${currentUser.uid}/summits`)).then((snapshot) => {
            snapshot.forEach((peak) => {
                console.log('snapshot')
                console.log(snapshot)
                let pID = peak.key
                console.log('peak.key')
                console.log(peak.key)

                let pName = peak.child('name').val()
                console.log('pName')
                console.log(pName)

                let pTrips = []
                get(child(dbRef, `users/${currentUser.uid}/summits/${peak.key}/trips`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        snapshot.forEach((trip)=>{
                            pTrips.push([trip.key,trip.val()])
                            })
                    } else {
                        console.log('There are no associated trips to this summit');
                    }
                }).catch((error) => {
                    console.log(error)
                    return error
                });
                console.log('Peak ID' + peak.key + ' name: ' + peak.child('name').val());
                myPeaksArr.push({id:pID,
                                name:pName,
                                trips:pTrips
                            })
                });

            console.log('Here is the peak array')
            console.log(myPeaksArr)
            
            setMyPeakList(myPeaksArr)
        })
        // onValue(myPeaks, (snapshot) => {
        //     snapshot.forEach((peak) => {
        //         let pID = peak.key
        //         let pName = peak.child('name').val()
        //         let pTrips = []
        //         get(child(dbRef, `users/${currentUser.uid}/summits/${peak.key}/trips`)).then((snapshot) => {
        //             if (snapshot.exists()) {
        //                 snapshot.forEach((trip)=>{
        //                     pTrips.push([trip.key,trip.val()])
        //                     })
        //             } else {
        //                 console.log('There are no associated trips to this summit');
        //             }
        //         }).catch((error) => {
        //             console.log(error)
        //             return error
        //         });
        //         console.log('Peak ID' + peak.key + ' name: ' + peak.child('name').val());
        //         myPeaksArr.push({id:pID,
        //                         name:pName,
        //                         trips:pTrips
        //                     })
        //         });

        //     console.log('Here is the peak array')
        //     console.log(myPeaksArr)
            
        // })
        console.log('Here is the state my peaklist')
        console.log(myPeakList)
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


    return (
    <main className='main'>
        <section className='container-right'>
            <h1>WEATHERING HEIGHTS</h1>
        </section>
        <section className='container-left'>
            {error && <Alert variant="danger">{error}</Alert>}
            <div>
                <Button varient="link" onClick={handleLogout}> Log Out</Button>
            </div>
            <section>
                <MyPeakList peaks={myPeakList} updateList={getMyPeakData}></MyPeakList>
            </section>
            <section>
                <Button onClick={handleAddSummit}>ADD A SUMMIT</Button>
                <AddSummit trigger={addSummit} setTrigger={setAddSummit} updateList={getMyPeakData}></AddSummit>
            </section>
        </section>
    </main>
        );
}