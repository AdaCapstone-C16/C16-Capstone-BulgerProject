
import React from 'react';
import {Link} from 'react-router-dom'
import Accordion from './Accordion';

export default function Homepage(props) {

    console.log("Inside of homepage");
    console.log(props);

    return (
    <section>
        <Link to='/login'>Login</Link>
        <h1> Weathering Heights </h1>
        <Accordion data={props.data}></Accordion>
    </section>   
    )
}