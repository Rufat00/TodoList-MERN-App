import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Homebutton from '../components/HomeButton';

const Loginpage = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name:'',
        password: ''
    })

    const {login} = useContext(AuthContext) 

    const changeHandler = (event)=>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {

            await axios.post('/auth/login', {...form}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                login(response.data.id)
            })
            .then(()=>{
                navigate("/")
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <main className="login">
            <section className="auth">
                <header>Todo List - Log In</header>
                <form className='loginForm'>
                    <div>
                        <label>Name:</label>
                        <input autoComplete="off" onChange={changeHandler} name='name' type="text" className="validate" maxLength={'16'}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input autoComplete="off" onChange={changeHandler} name='password' type="text" className="validate" maxLength={'16'}/>
                    </div>
                </form>
                <footer>
                    <Link to={'/registration'}>Create New</Link>
                    <button onClick={loginHandler}>Log In</button>
                </footer>
            </section>
            <Homebutton/>
            </main>
        </React.Fragment>
    );
}

export default Loginpage;
