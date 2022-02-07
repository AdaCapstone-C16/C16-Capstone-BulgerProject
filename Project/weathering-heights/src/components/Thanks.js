
import React, {useState} from 'react';
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import {db} from '../firebase'
import { get, ref, set, child } from "firebase/database";

export default function Thanks() {
    const { currentUser, fName, lName, syncName } = useAuth()
    const [error, setError] = useState('')
    const dbRef = ref(db);
    let first = ''
    let last = ''
    // This block checks to see if the user is in the db
    // Upon signup- the user is added to the db by their uid
    // Upon login- the user's first and last name are pulled from the db for use accross pages
    get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            first = snapshot.child("first_name").val()
            last = snapshot.child("last_name").val()
            console.log(snapshot.child("first_name").val(), snapshot.child("last_name").val())
            console.log(first, last)
            syncUserName(first, last)
            console.log('This user is in the db!')
        } else {
            set(ref(db, 'users/'+ currentUser.uid), {email:currentUser.email, first_name:fName, last_name:lName})
        }
    }).catch((error) => {
        console.log(error)
    });

    async function syncUserName() {
        try {
            setError('')
            await syncName(first, last)
        } catch (e) {
            setError(`Failed due to the following error ${e}`)
            console.log(error)
        }        
    }
    
    return (
    <section>
        <h2> Weathering Heights </h2>
        <h3>Welcome {fName} {lName}!</h3>
        <Button href='/'>Homepage</Button>
        <Button href='/my-profile'>MyProfile</Button>
    </section>   
    )
}