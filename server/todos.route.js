const {Router} = require('express')
const router = Router()
const Todo = require('./todo')

router.post('/add', async (req, res) => {
    try {

        const {title, text, userId} = req.body;

        const todo = await new Todo({
            owner: userId,
            title: title,
            text: text,
        })

        await todo.save()

        res.json(todo)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;