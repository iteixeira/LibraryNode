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

        livroDao.list('SELECT * FROM livros', function(error, results) {
            resp.marko(
                require('../views/books/list/list.marko'),
                {
                    livros: results
                }
            );
        });

    });
}