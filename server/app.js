const express = require('express')
const mongo = require('mongoose')

const app =  express()
app.use(express.json())

app.use('/auth', require('./auth.route.js'))
app.use('/todo', require('./todos.route.js'))

async function server(){
    try {
        await mongo.connect('mongodb+srv://admin:admin@cluster0.1zwe4.mongodb.net/TodoList?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })

        app.listen(5000,()=>{
            console.log('server runing on http://localhost:5000');
        })

    }
    catch (error) { 
        console.log(error);
    } 
}

server()