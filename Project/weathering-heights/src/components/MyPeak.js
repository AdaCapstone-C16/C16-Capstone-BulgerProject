import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'react-bootstrap'
import AddTrip from './AddTrip'
import Trip from './Trip';

const Peak = ({ pKey, id, name, trips, updateList }) => {
    const [addTrip, setAddTrip] = useState(false)
    const handleAddTrip= () => {
        setAddTrip(true)
    }

    const getTripListJSX = ( trips ) => {
        return trips.map((trip, index) => {
            console.log('Here is what is being passed down to Trip')
            console.log(trip[0])
            const date = trip[0]
            const desc = trip[1]
            console.log(trip[1])
            // return (<Trip key={index} trip={trip} updateList={updateList}/>);
            return (<Trip key={index} date={date} desc={desc} updateList={updateList}/>);

        })
    }

    return (
    <li>
        Peak Key={pKey}
        Peak {id}: {name}
        <p>Trips:{trips}</p>
        <ol>{getTripListJSX(trips)}</ol> 
        {/* <Button onClick={handleAddTrip}>ADD A Trip</Button> */}
        {/* <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={id} updateList={updateList}></AddTrip> */}
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