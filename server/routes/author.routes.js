const AuthorController = require('../controllers/author.controller');
module.exports = (app) => {
    app.get('/api/authors', AuthorController.getAllAuthors);
    app.get('/api/authors/:id', AuthorController.getAuthorById);
    app.post('/api/authors', AuthorController.createAuthor);
    app.patch('/api/authors/:id', AuthorController.updateAuthor);
    app.delete('/api/authors/:id', AuthorController.deleteAuthor)
}