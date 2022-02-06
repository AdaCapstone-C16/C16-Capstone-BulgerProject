import React from 'react';
import PropTypes from 'prop-types';


const Trip = ({date, desc, updateList}) => {

    return (
    <li>
        <p>Date: {date}</p>
        <p>Description:{desc}</p>
        <button> Delete </button>
        <button> Update </button>
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
