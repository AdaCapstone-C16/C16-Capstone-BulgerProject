import './stylesheets/BadgeDisplay.css';

const BadgeDisplay = ({ data }) => {
    console.log(data)
    // React Styling
    const img_size = {
        width: 150,
        height: 150,
        resizeMode: "contain",
        alignSelf: "center",
        borderWidth: 1,
      }
    
    // Filter for list of peak objects in particular range
    const range = data.filter(peak => peak.range === "Skagit Range");
    // List of peak keys in particular range
    const peaksInRange = []
    range.forEach((peak) => {
        peaksInRange.push(peak.key); 
    });
    const rangeLen = range.length;
    console.log(peaksInRange);
    console.log(rangeLen);

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