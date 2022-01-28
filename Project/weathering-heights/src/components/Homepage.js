
import React from 'react';
import {Link} from 'react-router-dom'

export default function Homepage() {
    return (
    <section>
        <Link to='/login'>Login</Link>
        <h1> Weathering Heights </h1>
    </section>   
    )
}