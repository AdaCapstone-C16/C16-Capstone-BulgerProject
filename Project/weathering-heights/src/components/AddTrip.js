import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, onValue, set } from 'firebase/database';
import Select from 'react-select'
// import { get, ref, set, child } from "firebase/database";
import { useAuth } from '../contexts/AuthContext'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const AddTrip = (props) => {
    // This section pulls peak info from the db
    // const peaks = ref(db, 'peaks/');
    // const peakNames = [];
    // const { currentUser } = useAuth()
    // const [summit, setSummit] = useState(['',''])

    // onValue(peaks, (snapshot) => {
    //     const data = snapshot.val();
    //     let count = 0
    //     for (let peak of data){
    //         if (peak && peak.indigenous_name) {
    //             peakNames.push({value:count,label:`${peak.indigenous_name} [${peak.name}]`})
    //         } else if (peak) {
    //             peakNames.push({value:count, label:peak.name})
    //         };
    //         count++;
    //     }
    // })
    
    
    // const handleSummitAdd = (event) => {
    //     setSummit([event.value, event.label])
    // }
    
    // const handleAddDB = () => {
    //     console.log(summit)
    //     set(ref(db, `users/${currentUser.uid}/summits/${summit[0]}`), {name:summit[1]})
    // }
    // console.log(props)

    const [selectedDate, setSelectedDate] = useState(null)
    const [tripNotes, setTripNotes] = useState(null)
    
    const handleSelectedDate =(date) =>{
        setSelectedDate(date)
    }
    
    const handleTripNotes = (input) => {
        setTripNotes(input.target.value)
    }

    const handleClose = () => {
        handleAddDB()
        props.setTrigger(false) 
    }

    const handleAddDB = () => {
        let strDate = JSON.stringify(selectedDate)
        console.log(strDate)
        let year = strDate.slice(1, 5)
        let day = strDate.slice(9,11)
        let mnth = strDate.slice(6,8)
        console.log('selected datesdfaawefas')
        const dateFinal = [mnth, day, year].join("-")
        console.log('final input .........')
        console.log(dateFinal)
        console.log(tripNotes)
    }
    return ( props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add New Trip:</h2>
                <form>
                    <label> Select a Bulger</label>
                    <DatePicker selected={selectedDate} onChange={handleSelectedDate}></DatePicker>
                    <textarea rows="5" cols="33" placeholder='Enter trip notes!' onChange={handleTripNotes}></textarea>
                </form>
                <button className="close-button" onClick={handleClose}>Add!</button>
                {props.children}
            </div>

        </div>
    
    ): "";
}

export default AddTrip