import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types';


const AddTrip = ({trigger, setTrigger, id, updateList}) => {

    const { currentUser } = useAuth()
    const [selectedDate, setSelectedDate] = useState(null)
    const [tripNotes, setTripNotes] = useState(null)

    
    const handleSelectedDate =(date) =>{
        setSelectedDate(date)
    }
    
    const handleTripNotes = (input) => {
        setTripNotes(input.target.value)
    }
    
    const handleAddDB = () => {
        let strDate = JSON.stringify(selectedDate)
        let year = strDate.slice(1, 5)
        let day = strDate.slice(9,11)
        let mnth = strDate.slice(6,8)
        const dateFinal = [mnth, day, year].join("-")
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${dateFinal}`), tripNotes)
    }
    
    const handleClose = () => {
        handleAddDB()
        updateList()
        // toggle(null)
        setTrigger(false) 
    }

    const handleCancel = () => {
        setTrigger(false) 
    }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add New Trip:</h2>
                <form>
                    <label> Select a Bulger</label>
                    <DatePicker selected={selectedDate} onChange={handleSelectedDate}></DatePicker>
                    <textarea rows="5" cols="33" placeholder='Enter trip notes!' onChange={handleTripNotes}></textarea>
                </form>
                <button className="close-button" onClick={handleClose}>Add!</button>
                <button  onClick={handleCancel}>Cancel</button>


                {/* {props.children} */}
            </div>
        </div>
    ): "";
}

AddTrip.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    updateList: PropTypes.func.isRequired
    };
export default AddTrip