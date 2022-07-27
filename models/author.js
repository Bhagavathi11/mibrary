const mongoose = require('mongoose')
// requiring book model
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

// checking if author has book if he has we should not delete him if not we should delete him
authorSchema.pre('remove',function(next){
    Book.find({author: this.id}, (err, books)=>{
        if(err){
            next(err)
        }else if(books.length > 0){
            next (new Error('This author has books still'))
        }else{
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)