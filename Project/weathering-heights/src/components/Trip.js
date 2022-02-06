import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'react-bootstrap'
import DeleteTrip from './DeleteTrip';
import UpdateTrip from './UpdateTrip';

const Trip = ({date, desc, updateList}) => {

    const [tripDelete, setTripDelete] = useState(false)
    const [tripUpdate, setTripUpdate] = useState(false)

    const handleTripDelete = () => {
        setTripDelete(true)
        console.log('you are in delete')
    }

    const handleTripUpdate = () => {
        setTripUpdate(true)
        console.log('You are in update!')
    }
    return (
    <li>
        <p>Date: {date}</p>
        <p>Description:{desc}</p>
        {/* <button onClick={handleDelete}> Delete </button> */}
        <Button onClick={handleTripDelete}>Delete Trip</Button>
        <DeleteTrip trigger={tripDelete} setTrigger={setTripDelete} updateList={updateList}/>
        <Button onClick={handleTripUpdate}>Update Trip</Button>
        <UpdateTrip trigger={tripUpdate} setTrigger={setTripUpdate} updateList={updateList}/>
        {/* <button onClick={handleTripUpdate}> Update </button> */}
    </li>
    );
}

// Trip.propTypes = {
//     trip: PropTypes.array,
//     updateList: PropTypes.func.isRequired
//     };
Trip.propTypes = {
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    updateList: PropTypes.func.isRequired
    };
export default Trip;
