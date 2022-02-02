import React from 'react';
import PropTypes from 'prop-types';
import MyPeak from './MyPeak';

const MyPeakList = ({ peaks }) => {
    
    const getPeakListJSX = ( peaks ) => {
        return peaks.map((peak) => {
            return (<MyPeak key={peak.id} id={peak.id} name={peak.name} trips={peak.trips}/>);
            });
        };
        return <ol>{getPeakListJSX(peaks)}</ol>;
    };


MyPeakList.propTypes = {
    peaks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            trips: PropTypes.array,
            })
            ).isRequired
    };

export default MyPeakList;