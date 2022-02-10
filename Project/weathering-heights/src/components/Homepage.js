
import React, { useState } from 'react';
//import { Accordion } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Accordion from './Accordion';
import CalendarForm from './CalendarForm';

export default function Homepage(props) {

    // const [clicked, setClicked] = useState(false);

    // //Handle click
    // const clickedSection = () =>{

    // }


    return (
    <section>
        <Link to='/login'>Login</Link>
        <h1> Weathering Heights </h1>
        <Accordion data={props.data}></Accordion>
    </section>   
    )
}