import React from 'react';
import PropTypes from 'prop-types';
import Peak from './Peak';

const BoardList = ({peaks}) => {
    const getBoardListJSX = (peaks) => {
        return peaks.map((peak) => {
            return (<Peak key={peak.Name} Rank={peak.Rank} Name={peak.Name} IndigenousName={peak.owner} Elevation={peak.title} Link={peak.Link} Coordinates={peak.Coordinates} Range={peak.Range}/>
                );
            });
        };

    return <ol>{getBoardListJSX(boards)}</ol>;
};

BoardList.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            owner: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            })
            ).isRequired,
            onClickBoard: PropTypes.func.isRequired
        };

export default BoardList;