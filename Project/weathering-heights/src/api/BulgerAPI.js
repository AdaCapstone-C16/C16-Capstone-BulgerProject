import { ref, onValue } from "firebase/database";
import { db } from './../firebase.js';

export const getBulgerListCoords = (peaksArr) => {
    const bulgerListCoords = [];

    for (let peak of peaksArr) {
        bulgerListCoords.push({
            key: peak.key,
            lat: peak.coordinates[0],
            lon: peak.coordinates[1],
        })
    };
    return bulgerListCoords;
}
