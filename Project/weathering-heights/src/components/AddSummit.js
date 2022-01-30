import React from 'react';
import '../components/stylesheets/AddSummit.css'
import { db } from '../firebase'
import { on, get, ref, set, child, onValue } from 'firebase/database';
// import { Dropdown } from 'semantic-ui-react'
const AddSummit = (props) => {

    const peaks = ref(db, 'peaks/');
    const peakNames = [];
    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let peak of data){
            if (peak && peak.indigenous_name) {
                peakNames.push(`${peak.indigenous_name} [${peak.name}]`)
            } else if (peak) {
                peakNames.push(peak.name)
            }
        }
        console.log(peakNames)
    })
    
    
    // const BoardList = ({ boards, onClickBoard}) => {
    const getPeakOptions = (peakNames) => {
        return peakNames.map((peakName) => {
            // return (<option key={board.id} id={board.id} owner={board.owner} title={board.title} onClickBoard={onClickBoard}/>
            return (<option value={peakName}>{peakName}</option>
            );
            });
        };
    
    
    return ( props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Add a Summit:</h1>
                <form>
                    <label> Select a Bulger</label>
                        <select>{getPeakOptions(peakNames)}</select>;                    
                </form>
                <button className="close-button" onClick={()=> props.setTrigger(false)}>Add!</button>
                {props.children}
            </div>

        </div>
    
    ): "";
}

export default AddSummit