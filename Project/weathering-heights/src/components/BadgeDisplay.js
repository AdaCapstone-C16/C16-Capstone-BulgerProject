import './BadgeDisplay.css';

const BadgeDisplay = () => {
    const img_size = {
        width: 150,
        height: 150,
        resizeMode: "contain",
        alignSelf: "center",
        borderWidth: 1,
      }

    return (
        <>
            {/* <img src="../../public/badges/big_foot_badge.png" alt="big foot badge"></img> */}
            <div className="img-wrapper">   
                <img 
                    src={require("./wenatchee_mountains_range.png")} 
                    alt="please be smaller"
                    style={img_size}
                    className="hover-zoom"
                ></img>
            </div> 
        </>
    )
};

export default BadgeDisplay;