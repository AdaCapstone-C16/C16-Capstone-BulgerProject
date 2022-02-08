import { useAuth } from '../contexts/AuthContext';
import './stylesheets/BadgeDisplay.css';

// React Styling
const img_size = {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    borderWidth: 1,
};

const BadgeDisplay = ({ data , userData }) => {
    const { currentUser } = useAuth();

    console.log(userData)
    // const updateTrip = (date, desc) => {
    //     set(ref(db, `users/${currentUser.uid}/summits/${id}/trips/${date}`), desc)
    //     updateList()
    // }

    // Filter for list of peak objects in particular range
    const range = data.filter(peak => peak.range === "Wenatchee Mountains");
    const rangeLen = range.length;
    console.log({range});

    // Filter for user's list of peak objects in particular range
    const userRange = userData.filter(peak => peak.range === "Wenatchee Mountains");
    const userRangeLen = userRange.length;
    console.log({userRange});

    if (rangeLen === userRangeLen) {
        console.log("YOU'vE HIKED ALL THE PEAKS");
    } else {
        console.log("you haven't quite hiked all the peaks")
    }

    // List of peak keys in particular range
    const peaksInRange = []
    range.forEach((peak) => {
        peaksInRange.push(peak.key); 
    });
    
    // console.log(peaksInRange);
    // console.log(rangeLen);

    // If user has hiked same number of peaks as peak length -> user gets a badge
    // eg. "user_id" : {
    //       "summits" : {
    //          1 : {
    //                "name": "Mount Baker",
    //                "trips": [],
    //                "range": "Skagit Range",
    //              }
    //          }
    //        "ranges" : {
    //          "chelan": {5: 4},   ### DO I actually need to track this or can 
    //          "skagit": {8: 7},   ### I just do mainList.length === myList.length
    //          "okanogan": true,   ### and then just store "range": true / "range": "rangeName.jpg"
    //        }
    //     }
    //     {5: 4}
    // }
    

    return (
        <>
            {/* <img src="../../public/badges/big_foot_badge.png" alt="big foot badge"></img> */}
            <div className="img-wrapper">   
                <img 
                    // src={require("../../public/badges/wenatchee_mountains_range.png")}
                    src={require("../badges/wenatchee_mountains_range.png")} 
                    alt="please be smaller"
                    style={img_size}
                    className="hover-zoom"
                ></img>
            </div> 
        </>
    )
};

export default BadgeDisplay;