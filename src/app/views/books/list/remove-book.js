const table = document.querySelector('#livros');
table.addEventListener('click', (event) => {
    const elementClicked = event.target;

    if (elementClicked.dataset.type === 'remocao') {
        const id = elementClicked.dataset.ref;
        fetch(`http://localhost:3000/books/${id}`, {method: 'DELETE'})
        .then(resp => {
            const tr = elementClicked.closest(`#livro_${id}`);
            tr.remove();
        }).catch(error => console.log(error));
    }
});