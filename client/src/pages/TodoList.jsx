import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import Todo from '../components/Todo';
import { AuthContext } from '../context/AuthContext';

const Todolist = () => {

    const [value, setValue] = useState({
        title: '',
        text: '',
    })

    const [todos, setTodos] = useState([])


    const {id} = useContext(AuthContext)

    const getTodos = async () => {
        try {
            
            await axios.get('/todo',{
                headers:{
                    'Content-Type': 'application/json'
                },
                params: {id}
            })
            .then(response => setTodos(response.data))

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getTodos()
    })

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
            .then(response => {
                setTodos([...todos, response.data])
            })
            .then(setValue({title: '' , text: ''}))

        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (id) => {
        try {
            
            await axios.delete(`/todo/delete/${id}`, {id},{
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(getTodos())

        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <main className='TodoList'>
            <Navbar/>
                <section className='todoContent'>
                    <form onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Title: </label>
                            <input value={value.title} onChange={e => setValue({...value,title: e.target.value})} maxLength={16} type="text" placeholder='Your title here...'/>
                        </div>
                        <div>
                            <label>Text: </label>
                            <input value={value.text} onChange={e => setValue({...value,text: e.target.value})} maxLength={150} type="text" placeholder='Your text here...'/>
                        </div>
                        <div>
                            <button onClick={createTodo} >Add Todo</button>
                        </div>
                    </form>
                    <div className="todos">
                        {
                            todos.map((todoValue, index) => {
                                return(
                                    <Todo title={todoValue.title} text={todoValue.text} index={index + 1} key={index} deleteFunc={() => deleteTodo(todoValue._id)}/>
                                )
                            })
                        }
                    </div>
                </section>
            <Footer/>
        </main>
    );
}

export default Todolist;
