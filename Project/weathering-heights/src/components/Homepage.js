
import React from 'react';
//import { Accordion } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Accordion from './Accordion';

export default function Homepage(props) {
    return (
    <section>
        <Link to='/login'>Login</Link>
        <h1> Weathering Heights </h1>
        <Accordion data={props.data}></Accordion>
    </section>   
    )
}