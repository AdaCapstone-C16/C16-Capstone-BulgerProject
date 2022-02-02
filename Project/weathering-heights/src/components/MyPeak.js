import React from 'react';
import PropTypes from 'prop-types';

const Peak = ({ id, name, trips }) => {
    return (
    <li>
        Peak {id}: {name}, trips: {trips}
    </li>
    );
};

Peak.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    trips: PropTypes.array,
    };

export default Peak;