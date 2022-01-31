import React from 'react';
import { useState, useEffect, useContext } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, onValue } from 'firebase/database';
import Select from 'react-select'

const AddSummit = (props) => {
    // This section pulls peak info from the db
    const peaks = ref(db, 'peaks/');
    const peakNames = [];
    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        let count = 1
        for (let peak of data){
            if (peak && peak.indigenous_name) {
                peakNames.push({value:count,label:`${peak.indigenous_name} [${peak.name}]`})
            } else if (peak) {
                peakNames.push({value:count, label:peak.name})
            };
            count++;
        }
    })
    
    const [summit, setSummit] = useState('')
    
    const handleSummitAdd = (event) => {
        setSummit(event.label)
    }
    
    const handleAddDB = () => {
        console.log(summit)
    }

    const handleClose = () => {
        handleAddDB()
        props.setTrigger(false) 
    }

    return ( props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Add a Summit:</h1>
                <form>
                    <label> Select a Bulger</label>
                    <Select options={peakNames} onChange={handleSummitAdd}/>
                </form>
                <button className="close-button" onClick={handleClose}>Add!</button>
                {props.children}
            </div>

        </div>
    
    ): "";
}

export default AddSummit