const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   owner: {type: Types.ObjectId, ref: 'User'},
   title: {type: String},
   text:{type: String},
})

module.exports = model('Todo', schema)