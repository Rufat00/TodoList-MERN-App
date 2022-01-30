import React, { useContext, useState } from 'react';
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import Homebutton from '../components/HomeButton';

const Registrationpage = () => {

    const navigate = useNavigate()
    const {login} = useContext(AuthContext) 

    const [form, setForm] = useState({
        name:'',
        password: ''
    })

    const changeHandler = (event)=>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    const registerHandler = async () =>{
        try {
            await axios.post('/auth/registration', {...form}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            
            .then(
                async () => {
                        await axios.post('/auth/login', {...form}, {
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        }).then(response => {
                            login(response.data.id)
                        })
                    }
                )

            .then(()=>{
                navigate('/')
            })
        } 
        catch (error) {
            console.log(error);
        }   
    }

    return (
        <React.Fragment>
            <main className="login">
            <section className="auth">
                <header>Todo List - Create Acaunt</header>
                <form className='loginForm'>
                    <div>
                        <label>Name:</label>
                        <input onChange={changeHandler} name='name' placeholder='Max length 16...' type="text" className="validate" maxLength={'16'}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input onChange={changeHandler} name='password' placeholder='Max length 16...' type="text" className="validate" maxLength={'16'}/>
                    </div>
                </form>
                <footer> 
                    <Link to={'/login'}>I have Acaunt</Link>
                    <button onClick={registerHandler}>Create</button>
                </footer>
            </section>
            </main>
            <Homebutton/>
        </React.Fragment>
    );
}

export default Registrationpage;
