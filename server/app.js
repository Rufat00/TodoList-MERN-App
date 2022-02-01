const express = require('express')
const mongo = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 5000

const app =  express()
app.use(express.json())
app.use(cors())

app.use('/auth', require('./auth.route.js'))
app.use('/todo', require('./todos.route.js'))

async function server(){
    try {
        await mongo.connect('mongodb+srv://admin:admin@cluster0.1zwe4.mongodb.net/TodoList?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })

        app.listen(PORT,()=>{
            console.log('server runing');
        })

    }
    catch (error) { 
        console.log(error);
    } 
}

server()