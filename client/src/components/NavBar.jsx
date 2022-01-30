import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const {logout, isLogin} = useContext(AuthContext)
    const toLogin = useNavigate()

    return (
        <header className='navBar'>
            <nav className="container">
                <h3>TodoList</h3>
                {isLogin ? <button onClick={logout} className="loging">Log Out</button> : <button onClick={()=> toLogin('/login')} className='loging' >Log In</button>}
            </nav>
        </header>
    );
}

export default Navbar;
