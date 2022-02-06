import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ref, set } from 'firebase/database';
import { Button } from 'react-bootstrap'
import {db} from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import Trip from './Trip';
import AddTrip from './AddTrip'
import DeleteSummit from './DeleteSummit';

const Peak = ({ pKey, id, name, trips, updateList }) => {
    const [addTripPopup, setAddTripPopup] = useState(false)
    const [deleteSummitPopup, setDeleteSummitPopup] = useState(false)
    const { currentUser } = useAuth()


    const handleAddTripPopup = () => {
        setAddTripPopup(true)
    }
    const handleDeleteSummitPopup = () => {
        setDeleteSummitPopup(true)
    }

    const addTrip = (date, notes) => {
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), notes)
        updateList()

    }
    const deleteSummit = () => {
        set(ref(db, `users/${currentUser.uid}/summits/${id}`), null)
        updateList()
    }

    const deleteTrip = (date) => {
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), null)
        updateList()
    }

    const updateTrip = (date, desc) => {
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), desc)
        updateList()
    }

    const getTripListJSX = ( trips ) => {
        return trips.map((trip, index) => {
            const date = trip[0]
            const desc = trip[1]
            return (<Trip key={index} date={date} desc={desc} deleteTrip={deleteTrip} updateTrip={updateTrip}/>);       
        })
    }

    
    return (
    <li>
        Peak Key={pKey}
        Peak {id}: {name}
        <p>Trips:{trips}</p>
        <ol>{getTripListJSX(trips)}</ol> 
        <Button onClick={handleAddTripPopup}>ADD A Trip</Button>
        <AddTrip trigger={addTripPopup} setTrigger={setAddTripPopup} addTrip={addTrip}/>
        <Button onClick={handleDeleteSummitPopup}>Delete Summit</Button>
        <DeleteSummit trigger={deleteSummitPopup} setTrigger={setDeleteSummitPopup} deleteSummit={deleteSummit}/>
    </li>
    );
};

Peak.propTypes = {
    pKey: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    trips: PropTypes.array,
    updateList: PropTypes.func.isRequired
    };

export default Peak;