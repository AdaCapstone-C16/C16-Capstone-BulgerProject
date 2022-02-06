import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const UpdateTrip = ({trigger, setTrigger}) => {

    // const { currentUser } = useAuth()

    // const handleDeleteSummit = () => {
    //     // set(ref(db, `users/${currentUser.uid}/summits/${props.id}`), {name:null})
    // }
    const newDate = 'NewDate'
    const newDesc = 'NewDesc'
    
    const handleYes = () => {
        // handleDeleteSummit()
        console.log("you chose yes")
        // props.updateList()
        setTrigger(false) 
    }

    const handleCancel = () => {
        console.log("you chose cancel")

        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Would you like to update this trip?</h2>
                {/* <button className="close-button" onClick={handleYes}>Add!</button> */}
                <button  onClick={handleCancel}>No</button>
                <button  onClick={handleYes}>Yes</button>
                {/* {props.children} */}
            </div>
        </div>
    ): "";
}
UpdateTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    };
export default UpdateTrip