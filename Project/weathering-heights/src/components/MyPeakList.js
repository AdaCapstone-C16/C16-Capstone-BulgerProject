import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Button, } from 'react-bootstrap'
import AddTrip from './AddTrip'
import Trip from './Trip';
import MyPeak from './MyPeak'

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 10vh;
    background: #fff;
    background-color: #504C54;

`;

const Container = styled.div`
    position: absolute;
    top: 30%;
    border-radius: 25px;
    background-color:#504C54;
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

const MyPeakList = ({ peaks, updateList }) => {
    const [clicked, setClicked] = useState(false)
    const [addTrip, setAddTrip] = useState(false)
    
    const handleAddTrip= () => {
        updateList()
        setAddTrip(true)
        }

    const toggle = (index) => {
        //if clicked question is already open, then close it 
        if(clicked === index){
            return setClicked(null);
        }
        setClicked(index)
    }


    // const getTripListJSX = ( trips ) => {
    //     return trips.map((trip, index) => {
    //         return (<Trip key={index} trip={trip} updateList={updateList}/>);
    //     })
    // }

    const getPeakListJSX = (peaks) => {
        return peaks.map((peak)=>{
            console.log('here is the peak info being passed to MyPeak')
            console.log(peak.key, peak.id, peak.name, peak.trips)
            return (<MyPeak key={peak.key} pKey={peak.key} id={peak.id} name={peak.name} trips={peak.trips} updateList={updateList}/>
            )
            // return (
            // <section>
            //     <MyPeak key={peak.key} pKey={peak.key} id={peak.id} name={peak.name} trips={peak.trips} updateList={updateList}/>
            //     <ol> {getTripListJSX} </ol>
            // </section>
            // )
        })
    }

    return (
        <ul>{getPeakListJSX(peaks)}</ul>
        // <IconContext.Provider value={{color : '#00FFB9', size : '25px'}}>
        //     <AccordionSection>
        //         <Container>
        //             {peaks.map((peak) => {
        //                 return (
        //                         <>
        //                             <Wrap onClick={()=> toggle(peak.id)}>
        //                             <div className="grid-container">
        //                                 <div className="bigItem">{peak.id}: {peak.name}</div>
        //                             </div>
        //                                 <span> {clicked === peak.id ? <FiMinus/> : <FiPlus/>}</span>
        //                             </Wrap>
        //                             {clicked === peak.id ? 
        //                                 <Dropdown>
        //                                     <p>Trips:</p> 
        //                                     {JSON.stringify(peak.trips)}
        //                                     <ol>{getTripListJSX(peak.trips)}</ol>
        //                                     <Button onClick={handleAddTrip} >ADD A Trip</Button>
        //                                     <AddTrip trigger={addTrip} setTrigger={setAddTrip} id={peak.id} key={peak.id} updateList={updateList} toggle={toggle}></AddTrip>
        //                                 </Dropdown>:
        //                                 null}
        //                         </>
        //                         )
        //                 })
        //             }
        //         </Container>
        //     </AccordionSection>
        // </IconContext.Provider>
    )
    };


MyPeakList.propTypes = {
    peaks: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            trips: PropTypes.array,
            })
            ).isRequired, 
            updateList: PropTypes.func.isRequired
    };

export default MyPeakList;