import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext'
import 'react-datepicker/dist/react-datepicker.css'

const DeleteSummit = ({props}) => {

    const { currentUser } = useAuth()

    const handleDeleteSummit = () => {
        set(ref(db, `users/${currentUser.uid}/summits/${props.id}`), {name:null})
    }
    
    const handleYes = () => {
        handleDeleteSummit()
        props.updateList()
        props.setTrigger(false) 
    }

    const handleNo = () => {
        props.setTrigger(false) 
    }

    return ( props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Are you sure you would like to  delete this trip?</h2>
                {/* <button className="close-button" onClick={handleYes}>Add!</button> */}
                <button  onClick={handleNo}>No</button>
                {props.children}
            </div>
        </div>
    ): "";
}

export default DeleteSummit