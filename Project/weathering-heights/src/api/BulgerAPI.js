<<<<<<< HEAD
import { ref , onValue } from "firebase/database";
import { db } from '../firebase';

export const getBulgerListData = () => {
    const bulgerListArr = [];

    // GET peak data from FBDB
    const peaks = ref(db, 'peaks/');

    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        // console.log(data)
        for (let peak in data) {
            if (peak) {  
            bulgerListArr.push({
                key: peak,
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
=======
import { ref, onValue } from "firebase/database";
import db from './../firebase.js';

//state
export const getBulgerListData = () => {
    const bulgerListArr = [];
  
    // GET peak data from FBDB
    const peaks = ref(db, 'peaks/');
    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i]) { 
            bulgerListArr.push({
                key: i,
                chance_precip: data[i].chance_precip,
                coordinates: data[i].coordinates,
                elevation: data[i].elevation,
                indigenous_name: data[i].indigenous_name,
                link: data[i].link,
                name: data[i].name,
                range: data[i].range,
                rank: data[i].rank,
                temp: data[i].temp,
                wind_speed: data[i].wind_speed,
>>>>>>> 0e6818c4b626f1946bb3055747d8b8c760a8349d
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
<<<<<<< HEAD
            lon: [1],
        })
    };
    return bulgerListCoords;
}
=======
            lon: peak.coordinates[1],
        })
    };
    console.log(bulgerListCoords);
    return bulgerListCoords;
}
>>>>>>> 0e6818c4b626f1946bb3055747d8b8c760a8349d
