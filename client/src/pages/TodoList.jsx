import axios from 'axios';
import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

const Todolist = () => {

    const [value, setValue] = useState({
        title: '',
        text: '',
    })

    const {id} = useContext(AuthContext)

    const createTodo = async () => {
        try {
            
            if(value.title.length === 0){
                return
            }
            if(value.text.length === 0){
                return
            }

            await axios.post('/todo/add', {...value, id}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className='TodoList'>
            <Navbar/>
                <section className='todo'>
                    <form onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Title: </label>
                            <input onChange={e => setValue({...value,title: e.target.value})} maxLength={16} type="text" placeholder='Your title here...'/>
                        </div>
                        <div>
                            <label>Text: </label>
                            <input onChange={e => setValue({...value,text: e.target.value})} type="text" placeholder='Your text here...'/>
                        </div>
                        <div>
                            <button onClick={createTodo} >Add Todo</button>
                        </div>
                    </form>
                    <div className="todos">

                    </div>
                </section>
            <Footer/>
        </main>
    );
}

export default Todolist;
