let myLibrary = [{title:"The Hobbit", author:'Tolkien', year:'1948', read:'read', bookId: 0}];
const table = document.querySelector('tbody');
const form = document.querySelector('form');
const inpTitle = document.querySelector('#title');
const inpAuthor = document.querySelector('#author');
const inpYear = document.querySelector('#year');
const inpStatus = document.querySelector('#status');
const newBook = document.querySelector('.new button');
const saveBook = document.querySelector('form button');




function Book(title,author,pages,read, bookId){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = bookId;
}

let id = 0; 

function addBookToLibrary(lib){
    const bookTitle = inpTitle.value;
    const bookAuthor = inpAuthor.value;
    const bookYear = inpYear.value;
    const bookRead = inpStatus.value;
    const bookId = id+1;
    const book = new Book(bookTitle, bookAuthor, bookYear, bookRead, bookId);
    lib.push(book);
}


function fillTable(lib){
    for(let book of lib){
        fillRow(book, newRow());
    }
}

function newRow(){
    const row = document.createElement('tr');
    table.append(row);
    return row;
}

function fillRow(book, row){
    for(let key in book){
        if(book.hasOwnProperty(key)){
            if(key == 'bookId') break;
            if(key == 'title' ) {
                const tHead = document.createElement('th');
                tHead.textContent = book[key];
                row.append(tHead);
                const X = document.createElement('button');
                X.addEventListener('click', ()=>{
                    document.querySelector(`[data-id="${X.dataset.id}"]`).remove();
                    removal(X.dataset.id);
                })
                X.textContent = 'x';
                X.dataset.id = book.bookId;
                tHead.append(X);
                continue;
            }
            const tData = document.createElement('td');
            tData.textContent = book[key];
            row.append(tData);
            row.dataset.id = book.bookId;
        }
    }
}


fillTable(myLibrary);

newBook.addEventListener('click', ()=>{
    form.classList.remove('hide');
})

saveBook.addEventListener('click', (evt)=>{
    evt.preventDefault();
    addBookToLibrary(myLibrary);
    fillRow(myLibrary[myLibrary.length-1],newRow());
    form.classList.add('hide');
})

function removal(id){
    const newLib = myLibrary.filter(book => !book.bookId == id);
    myLibrary = newLib;
    fillTable(myLibrary);
}



