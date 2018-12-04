class LivroDao {

    constructor(db) {
        this._db = db;
    }

    insert(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) VALUES (?, ?, ?)
            `, [book.title, book.price, book.description]);
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, results) => error ? reject('Database error') : resolve(results));
        });
        
    }

    findBy(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id],
                (error, result) => error ? reject('Database error') : resolve(result)
            );
        });
    }

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
                [book.titulo, book.preco, book.descricao, book.id],
                (error, _) => error ? reject('Database error') : resolve()
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'DELETE FROM livros WHERE id = ?',
                [id],
                (error, _) => error ? reject('Database error') : resolve()
            );
        });
    }
}

module.exports = LivroDao;