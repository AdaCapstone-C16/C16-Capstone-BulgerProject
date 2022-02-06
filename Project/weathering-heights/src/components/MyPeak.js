import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'react-bootstrap'
import AddTrip from './AddTrip'
import Trip from './Trip';
import {db} from '../firebase'
import { ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext'

const Peak = ({ pKey, id, name, trips, updateList }) => {
    const [addTrip, setAddTrip] = useState(false)
    const { currentUser } = useAuth()


    const handleAddTrip= () => {
        setAddTrip(true)
    }

    const deleteTrip = (date) => {
        console.log('you are in MyPeak level delete')
        console.log('This is the date')
        console.log(date)
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), null)
        updateList()
    }

    const updateTrip = (date, desc) => {
        console.log('you are in MyPeak level update')
        console.log('This is the date and new desc')
        console.log(date)
        console.log(desc)
        set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), desc)
        updateList()
    }

    const getTripListJSX = ( trips ) => {
        return trips.map((trip, index) => {
            console.log('Here is what is being passed down to Trip')
            console.log(trip[0])
            const date = trip[0]
            const desc = trip[1]
            console.log(trip[1])
            // return (<Trip key={index} trip={trip} updateList={updateList}/>);
            return (<Trip key={index} date={date} desc={desc} deleteTrip={deleteTrip} updateTrip={updateTrip}/>);

        })
    }

    return (
    <li>
        Peak Key={pKey}
        Peak {id}: {name}
        <p>Trips:{trips}</p>
        <ol>{getTripListJSX(trips)}</ol> 
        <Button onClick={handleAddTrip}>ADD A Trip</Button>
        <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={id} updateList={updateList}></AddTrip>
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