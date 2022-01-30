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

        const todo = await Todo.findOneAndDelete({_id: req.params.id})

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;