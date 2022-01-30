const express = require('express')
const router = express.Router()
const User = require('./user')
const hash = require('bcryptjs');

router.post('/registration', async(req,res)=>{
    try {
        const {name, password} = req.body


        const isUsed = await User.findOne({name})

        if(isUsed){
            return res.status(300).json({message: "This name ia already using try another one"})
        }

        const hashedPassword = await hash.hash(password, 12)

        const user = new User({
            name, password: hashedPassword,
        })
        await user.save()
            
        res.status(201).json({message: "User created!"})
        

    } catch (error) {
        console.log(error);
    }
})

module.exports = router 

router.post('/login', async(req,res)=>{
    try {
        const {name, password} = req.body

        const user = await User.findOne({name})

        if(!user){
            return res.json({message: 'There is not such kind of user'})
        }

        const isMatch = hash.compare(password, user.password)

        isMatch.then(value =>{
            if(value === false){
                return res.json({message: 'wrong password'})
            }

            res.json({id: user.id})
        })
        


    } catch (error) {
        console.log(error);
    }
})

module.exports = router 