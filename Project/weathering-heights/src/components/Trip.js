import React from 'react';
// import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'react-bootstrap'

const Trip = ({trip}) => {
    // const [addTrip, setAddTrip] = useState(false)
    // const handleAddTrip= () => {
    //     setAddTrip(true)
    // }

    return (
    <li>
        <p>Date: {trip[0]}</p>
        <p>Description:{trip[1]}</p>
        <p> </p>
        {/* <Button onClick={handleAddTrip}>ADD A Trip</Button>
        <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={id}></AddTrip> */}
    </li>
    );
}



// Peak.propTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     trips: PropTypes.array,
//     };

export default Trip;
