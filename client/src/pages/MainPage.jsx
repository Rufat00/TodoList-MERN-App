import React from 'react';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Homebutton from '../components/HomeButton';

const Mainpage = () => {

    const navigate = useNavigate()

    return (
        <main className='mainPage'>
            <Navbar/>
            <div className='mainContent'>
                <h2>The Best Todo App</h2>
                <button onClick={()=> navigate('/todo-list')} >Begin</button>
            </div>
            <Footer/>
            <Homebutton/>
        </main>
    );
}

export default Mainpage;
