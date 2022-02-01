//for all purposes, this is basically the peakList 
import React, { useState } from 'react';
import { Data } from "./Data";
import { threePeaks } from "./Data";
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';

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

    button{
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
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #00ffb9;
    border-top: 1px solid #00ffb9;
    border-radius: 25px;
    margin-left: 30px;
    margin-right: 30px;

    p{
        font-size: 1rem;
    }
`;

const Accordion = (props) => {

    const [clicked, setClicked] = useState(false)

    const toggle = (index) => {
        //if clicked question is already open, then close it 
        if(clicked === index){
            return setClicked(null);
        }
        setClicked(index)
    }

    return (
    <IconContext.Provider value={{color : '#00FFB9', size : '25px'}}>
        <AccordionSection>
            <Container>
            <button>Sort</button>

            {console.log(props.data)}
                {/* {Data.map((item, index)=>{
                    return(
                        <>
                        <Wrap onClick={()=> toggle(index)} key={index}>
                        <h1>{item.question}</h1>
                        <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                        </Wrap>
                        {clicked === index ? 
                            <Dropdown>
                            <p>{item.answer}</p>
                            </Dropdown>:
                            null}
                        </>
                    )
                })
                } */}

                {threePeaks.map((item, index) => {
                    return(
                        <>
                        <Wrap onClick={()=> toggle(index)} key={index}>
                        <div className="grid-container">
                            <div className="bigItem">{item.name}</div>
                            <div className="item">Temp: {item.temp}</div>
                            <div className="item">Wind: {item.wind_speed}</div>
                            <div className="item">Precip: {item.chance_precip}</div>
                                {/* <h1>{item.name}</h1>
                                <p>temp: {item.temp} wind: {item.wind_speed} chance precip: {item.chance_precip}</p> */}
                        </div>
                            <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                        </Wrap>
                        {clicked === index ? 
                            <Dropdown>
                            <p>{item.rank} {item.indigenous_name} {item.elevation} {item.link} {item.coordinates}</p>
                            </Dropdown>:
                            null}
                        </>
                    )
                })
                }

                {props.data.map((item, index) => {
                    return(
                        <>
                        <Wrap onClick={()=> toggle(index)} key={index}>
                        <div className="grid-container">
                            <div className="bigItem">{item.name}</div>
                            <div className="item">Temp: {item.temp}</div>
                            <div className="item">Wind: {item.wind_speed}</div>
                            <div className="item">Precip: {item.chance_precip}</div>
                        </div>
                            <span> {clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                        </Wrap>
                        {clicked === index ? 
                            <Dropdown>
                            <p>{item.rank} {item.indigenous_name} {item.elevation} {item.link} {item.coordinates}</p>
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

//