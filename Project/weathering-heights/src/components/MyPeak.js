import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'react-bootstrap'
import AddTrip from './AddTrip'

const Peak = ({ id, name, trips }) => {
    const [addTrip, setAddTrip] = useState(false)
    const handleAddTrip= () => {
        setAddTrip(true)
    }

    return (
    <li>
        Peak {id}: {name}, trips: {trips} 
        <Button onClick={handleAddTrip}>ADD A Trip</Button>
        <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={id}></AddTrip>
    </li>
    );
};

Peak.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    trips: PropTypes.array,
    };

export default Peak;