import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Homebutton from '../components/HomeButton';
import Navbar from '../components/NavBar';
import Todo from '../components/Todo';
import { AuthContext } from '../context/AuthContext';

const Todolist = () => {

    const [value, setValue] = useState({
        title: '',
        text: '',
    })

    const [todos, setTodos] = useState([])
    const [mod, setMod] = useState({is:'create',id:''})


    const {id} = useContext(AuthContext)

    const getTodos = async (token) => {
        try {
            
            await axios.get('/todo',{
                headers:{
                    'Content-Type': 'application/json'
                },
                cancelToken: token,
                params: {id}
            })
            .then(response => setTodos(response.data))

        } catch (error) {
            if(axios.isCancel(error)){
                return
            }else{
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        let source = axios.CancelToken.source()

        getTodos(source.token)

        return () => {source.cancel()}
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

    function updateAll(){
        setValue({title: '', text: ''})
        setMod({is:'create',id:''})
    }

    const updateTodo = async (id) => {
        try {
            
            await axios.post(`/todo/update/${id}`, {...value}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(updateAll())

        } catch (error) {
            console.log(error);
        }
    }
    const changeTodo = async (id) => {
        try {
            
            await axios.get(`/todo/change/${id}`, {id}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                setValue({title: response.data.title , text: response.data.text})
                setMod({is:'update',id:id})
            })

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
                            <input autoComplete="off" value={value.title} onChange={e => setValue({...value,title: e.target.value})} maxLength={16} type="text" placeholder='Your title here...'/>
                        </div>
                        <div>
                            <label>Text: </label>
                            <input autoComplete="off" value={value.text} onChange={e => setValue({...value,text: e.target.value})} maxLength={150} type="text" placeholder='Your text here...'/>
                        </div>
                        <div>
                            {mod.is === 'update' ? <><button onClick={()=>updateTodo(mod.id)} >Change</button><button onClick={updateAll} >Cancel</button></> : <button onClick={createTodo} >Add Todo</button>}
                        </div>
                    </form>
                    <div className="todos">
                        {
                            todos.map((todoValue, index) => {
                                return(
                                    <Todo
                                     title={todoValue.title} 
                                     text={todoValue.text} 
                                     index={index + 1} 
                                     key={index} 
                                     deleteFunc={() => deleteTodo(todoValue._id)}
                                     changeFunc={()=> changeTodo(todoValue._id)} 
                                     />
                                )
                            })
                        }
                    </div>
                </section>
            <Footer/>
            <Homebutton/>
        </main>
    );
}

export default Todolist;
