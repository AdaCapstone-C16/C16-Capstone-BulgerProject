import React from 'react';


const Trip = ({trip}) => {

    return (
    <li>
        <p>Date: {trip[0]}</p>
        <p>Description:{trip[1]}</p>
        <button> Delete </button>
        <button> Update </button>
        {/* <Button onClick={handleAddTrip}>ADD A Trip</Button>
        <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={id}></AddTrip> */}
    </li>
    );
}

export default Trip;
