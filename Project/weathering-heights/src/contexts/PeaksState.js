//This provides all peaksState

import react from 'react';
import peaksContext from './peaksContext';
import { getBulgerListData } from '../api/BulgerAPI';


const PeaksState = (props) => {
    const state = getBulgerListData();

    
    
    return (
        <peaksContext.Provider value={state}>
            {props.children}
        </peaksContext.Provider>
    )
}

export default PeaksState;