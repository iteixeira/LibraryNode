const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database')

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body>
            </html>
        `);
    });

    app.get('/books', function(req, resp) {
        const livroDao = new LivroDao(db);

        livroDao.list().then(livros => resp.marko(
            require('../views/books/list/list.marko'),
            {
                livros: livros
            }
        )).catch(error => console.log(error));
    });

    app.get('/book/form', function(req, resp) {
        resp.marko(require('../views/books/form/form.marko'));
    });

    app.post('/books', function(req, resp) {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao.insert(req.body);
        resp.redirect('/books');
    });

    app.get('/book/:id', (req, resp) => {
        const id = req.params.id;
        console.log('ID: ', id);
        const dao = new LivroDao(db);
        dao.findBy(id).then(book => console.log('Book', book));
    });
}