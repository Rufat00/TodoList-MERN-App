const {Router} = require('express')
const router = Router()
const Todo = require('./todo')

router.post('/add', async (req, res) => {
    try {

        const {title, text, id} = req.body;

        const todo = await new Todo({
            owner: id,
            title: title,
            text: text,
        })

        await todo.save()

        res.json(todo)

    } catch (error) {
        console.log(error);
    }
})

router.get('/', async (req,res) => { 
    try {
        
        const {id} = req.query

        const todo = await Todo.find({owner: id})
        res.json(todo)

    } 
    catch (error) {
        console.log(error);    
    }
}) 

router.delete('/delete/:id', async (req, res) => {
    try {

        await Todo.findOneAndDelete({_id: req.params.id})

    } catch (error) {
        console.log(error);
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const {title, text} = req.body  
        const todo = await Todo.findOneAndUpdate({_id: req.params.id},{title: title,text: text})
        todo.save()

    } catch (error) {
        console.log(error);
    }
})

router.get('/change/:id', async (req, res) => {
    try {

        const todo = await Todo.findOne({_id: req.params.id})
        res.json({title: todo.title, text: todo.text})

    } catch (error) {
        console.log(error); 
    }
})

module.exports = router;