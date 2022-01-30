import React from 'react';
import {BiPencil, BiTrashAlt} from 'react-icons/bi'

const Todo = ({title, text, index, deleteFunc}) => {
    return (
        <div className='todo'>
            <div className='value'>
                <div>{index}.</div>
                <div>
                    <h5>{title}</h5>
                    <p>{text}</p>
                </div>
            </div>
            <div>
                <BiPencil/>
                <BiTrashAlt onClick ={deleteFunc} />
            </div>
        </div>
    );
}

export default Todo;
