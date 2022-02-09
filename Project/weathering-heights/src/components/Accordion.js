//for all purposes, this is basically the peakList 
//-----------------------------------------------{imports}------------------------------------------------------//
import React, { useState, useContext } from 'react';
import { Data } from "./Data";
import { threePeaks } from "./Data";
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CalendarForm from './CalendarForm';
// import peaksContext from '../contexts/peaksContext';

//-----------------------------------------------{styled componenets css}------------------------------------------------------//

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 10vh;
    background: #fff;
`;
const Container = styled.div`
    position: absolute;
    top: 30%;
    border-radius: 25px;
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);

    form{
        margin-left: 90%;
        border-radius: 5px;
        margin-top: 1%;
        margin-bottom: 1%;
    }
`;

const Wrap = styled.div`
    background: #272727;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%
    text-align: center;
    cursor: pointer;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;

    h1{
        padding: 2rem;
        font-size: 1rem;
    }

    span{
        margin-right: 1.5rem;
    }

    .bigItem {
        grid-area: myArea;
        font-size: 2rem;
    }
    .item{
        font-size: 1rem;
    }
    
    .grid-container {
        display: grid;
        grid-template-areas: 'myArea myArea . . .';
        grid-gap: 10px;
        background: #272727;
        padding: 10px;
        border-radius: 25px;
    }
    
    .grid-container > div {
        text-align: center;
        padding: 20px;
        border-radius: 25px;
    }
`;

const Dropdown = styled.div`
    background: #1c1c1c
    color: #00ffb9
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    border-bottom: 1px solid #00ffb9;
    border-top: 1px solid #00ffb9;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;

    div{
        font-size: 1rem;
        text-indent: 35px;
    }
`;

//-----------------------------------------------{Accordion Function}------------------------------------------------------//

const Accordion = (props) => {

    //const a = useContext(peaksContext)

    //Dummy data for the dynamic parameters
    let temp = 101;
    let precip = 0;
    let wind = 101;

    const bulgerList = props.data;
    //lift this state
    const [clicked, setClicked] = useState(false);
    const [selectedPeak, setSelectedPeak] = useState(null);
    const [sortby, setSortby] = useState('default');
    // console.log("Inside accordion")
    // console.log(props);

    const toggle = (index) => {
        //if clicked question is already open, then close it 
        //raise this handler 
        if(clicked === index){
            return setClicked(null);
        }
        setClicked(index)
        const myList = getSortedList(sortby);
        setSelectedPeak(myList[index].name)
    }


    //pass the correct JSX to return/render
    //this is the selection dropdown menu
    let option = null;
    const selection = (
    <form>
        <label for="weather">Sort by:</label>
        <select name="weather-parameter" id="weather-parameter" onChange={(e)=>{
            option = e.target.value;
            setSortby(option);

        }}>
            <option value="default">Default</option>
            <option value="temp">Temperature</option>
            <option value="wind">Wind Speed</option>
            <option value="precip">Precipitation</option>
        </select>
        {/* <input type="submit" value="Summit! 🏔️"/> */}
    </form>
    );
    
    function compareTemp( a, b ) {
        return (a.temp - b.temp);
    }
    function compareWind( a, b ) {
        return (a.windSpeed - b.windSpeed);
    }
    function comparePrecip( a, b ) {
        return (a.chance_precip - b.chance_precip);
    }
        
        //objs.sort( compare );



    //create a function to actually get the render, take in the sort category as an argument
    //This function should take in a parameter and then call a helper function and send it the sort criteria 
    //input: category 
    //output: sorted result 
    
    const getSortedList = (category) => {

        const peaksSorted = [...bulgerList];
        //const peaksSorted = [...threePeaks];
        if(category === 'temp'){
            peaksSorted.sort( compareTemp );
        }
        if(category === 'wind'){
            peaksSorted.sort( compareWind );
        }
        if(category === 'precip'){
            peaksSorted.sort( comparePrecip );
        }
        return peaksSorted;

        // const resultJSX = testJSX(peaksSorted);
        // return resultJSX;
    }

    //-----------------------------------------------{JSX}------------------------------------------------------//

    return (
    <IconContext.Provider value={{color : '#00FFB9', size : '25px'}}>
        <CalendarForm mountain={selectedPeak}></CalendarForm>
        <AccordionSection>
            <Container>
            {selection}
            {console.log(sortby)}
            {getSortedList(sortby).map((item, index) => { 
                return(
                    <>
                    <Wrap onClick={()=> toggle(index)} key={index}>
                    <div className="grid-container">
                        <div className="bigItem">{item.name}</div>
                        <div className="item">Temp: {item.temp} °F</div>
                        <div className="item">Wind: {item.windSpeed}</div>
                        <div className="item">Precip: {item.chance_precip}</div>
                    </div>
                        <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                    </Wrap>
                    {clicked === index ? 
                        <Dropdown>
                        <div> 🥇 {item.rank}</div> 
                        <div> ❕ {item.indigenous_name}</div>
                        <div> 🧗 {item.elevation}</div>
                        <div> 🔗 {item.link}</div>
                        <div> 📍 {item.coordinates}</div>
                        </Dropdown>:
                        null}
                    </>
                )
            })
            }
            </Container>
        </AccordionSection>
    </IconContext.Provider>
    );

};
export default Accordion