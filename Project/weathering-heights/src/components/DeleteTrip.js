import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const DeleteTrip = ({trigger, setTrigger, deleteTrip, date, desc}) => {

    // const { currentUser } = useAuth()

    // const handleDeleteSummit = () => {
    //     // set(ref(db, `users/${currentUser.uid}/summits/${props.id}`), {name:null})
    // }

    const handleYes = () => {
        deleteTrip(date, desc)
        console.log("you chose yes")
        setTrigger(false) 
    }

    const handleNo = () => {
        console.log("you chose no")

        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Are you sure you would like to  delete this trip?</h2>
                {/* <button className="close-button" onClick={handleYes}>Add!</button> */}
                <button  onClick={handleNo}>No</button>
                <button  onClick={handleYes}>Yes</button>
                {/* {props.children} */}
            </div>
        </div>
    ): "";
}
DeleteTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    deleteTrip: PropTypes.func.isRequired, 
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    };
export default DeleteTrip