import React from 'react';
import { BiHome } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'

const Homebutton = () => {
    const navigate = useNavigate()

    return (
        <div className='homeButton' onClick={()=> navigate('/')} >
            <BiHome />
        </div>
    );
}

export default Homebutton;
