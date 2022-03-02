import React from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";

function App() {

    return (
        <div>
            <div><Link to={"galerie"}>Zur Galerie</Link></div>
            <div><Outlet /></div>
        </div>
    );
}

export default App;
