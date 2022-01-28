import { ref, onValue } from "firebase/database";
import db from './../firebase.js';

export const getBulgerListData = () => {
    const bulgerListArr = [];
  
    // GET peak data from FBDB
    const peaks = ref(db, 'peaks/');
    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        // console.log(data)
        for (let peak of data) {
          if (peak) {  
            bulgerListArr.push({
                key: peak.key, //TODO
                chance_precip: peak.chance_precip,
                coordinates: peak.coordinates,
                elevation: peak.elevation,
                indigenous_name: peak.indigenous_name,
                link: peak.link,
                name: peak.name,
                range: peak.range,
                rank: peak.rank,
                temp: peak.temp,
                wind_speed: peak.wind_speed,
            });
            };
        };
    });
    return bulgerListArr
}

export const getBulgerListCoords = (peaksArr) => {
    const bulgerListCoords = [];

    for (let peak of peaksArr) {
        bulgerListCoords.push({
            lat: peak.coordinates[0],
            lon: [1],
        })
    };
    return bulgerListCoords;
}