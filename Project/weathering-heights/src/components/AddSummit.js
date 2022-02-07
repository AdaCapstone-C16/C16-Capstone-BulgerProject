import React from 'react';
import { useState } from 'react';
import '../components/stylesheets/AddSummit.css'
import {db} from '../firebase'
import { ref, onValue, set } from 'firebase/database';
import Select from 'react-select'
// import { get, ref, set, child } from "firebase/database";
import { useAuth } from '../contexts/AuthContext'
import PropTypes from 'prop-types';

const AddSummit = ({trigger, setTrigger, updateList}) => {
    // This section pulls peak info from the db
    const peaks = ref(db, 'peaks/');
    const peakNames = [];
    const { currentUser } = useAuth()
    const [summit, setSummit] = useState(['',''])

    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        let count = 0
        for (let peak of data){
            if (peak && peak.indigenous_name) {
                peakNames.push({value:count,label:`${peak.indigenous_name} [${peak.name}]`})
            } else if (peak) {
                peakNames.push({value:count, label:peak.name})
            };
            count++;
        }
    })
    
    const handleSummitAdd = (event) => {
        setSummit([event.value, event.label])
        }
    
    const handleAddDB = () => {
        console.log(summit)
        set(ref(db, `users/${currentUser.uid}/summits/${summit[0]}`), {name:summit[1]})
        }

    const handleClose = () => {
        handleAddDB()
        updateList()
        setTrigger(false) 
        }
    const handleCancel = () => {
            setTrigger(false) 
            }

    return ( trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add New Summit:</h2>
                <form>
                    <label> Select a Bulger</label>
                    <Select options={peakNames} onChange={handleSummitAdd}/>
                </form>
                <button className="close-button" onClick={handleClose}>Add!</button>
                <button onClick={handleCancel}> Cancel </button>
            </div>
        </div>
    
    ): "";
}

AddSummit.propTypes = {
    trigger: PropTypes.bool.isRequired,
    setTrigger: PropTypes.func.isRequired,
    updateList: PropTypes.func.isRequired
    };
export default AddSummit