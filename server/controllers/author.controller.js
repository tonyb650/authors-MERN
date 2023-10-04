const Author = require('../models/author.model')

module.exports = { 
createAuthor : (req, res) => {
    Author.create(req.body)
    .then(newAuthor => res.json(newAuthor))
    .catch(err => res.status(400).json(err))
},

getAllAuthors : (req, res) => {
    Author.find({})
    .then(allAuthors => res.json(allAuthors))
    .catch(err => console.log(err))
},

getAuthorById : (req, res) => {
    Author.findOne({_id : req.params.id})
    .then(oneAuthor => res.json(oneAuthor))
    .catch(err => res.status(400).json(err))
},

getAllAuthors : (req, res) => {
    Author.find({})
    .then(allAuthors => res.json(allAuthors))
    .catch(err => console.log(err))
},

updateAuthor : (req, res) => {
    Author.findOneAndUpdate({_id : req.params.id}, req.body, {new:true, runValidators:true})
    .then(updatedAuthor => res.json(updatedAuthor))
    .catch(err => res.status(400).json(err))
},

deleteAuthor : (req, res) => {
    Author.findOneAndDelete({_id : req.params.id})
    .then(result => res.json(result))
    .catch(err => console.log(err))
},

}