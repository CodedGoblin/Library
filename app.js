let myLibrary = [{title:"The Hobbit", author:'Tolkien', year:'1948', read:'read'}];
const table = document.querySelector('tbody');
const form = document.querySelector('form');
const inpTitle = document.querySelector('#title');
const inpAuthor = document.querySelector('#author');
const inpYear = document.querySelector('#year');
const inpStatus = document.querySelector('#status');
const newBook = document.querySelector('.new button');
const saveBook = document.querySelector('form button');



function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    let bookTitle = inpTitle.value;
    let bookAuthor = inpAuthor.value;
    let bookYear = inpYear.value;
    let bookRead = inpStatus.value;

    const book = new Book(bookTitle, bookAuthor, bookYear, bookRead);
    myLibrary.push(book);
}


function fillTable(){
    for(let book of myLibrary){
        newRow();
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
            if(key == 'title' ) {
                const tHead = document.createElement('th');
                tHead.textContent = book[key];
                row.append(tHead);
                continue;
            }
            const tData = document.createElement('td');
            tData.textContent = book[key];
            row.append(tData);
        }
    }
}


fillTable();

newBook.addEventListener('click', ()=>{
    form.classList.remove('hide');
})


saveBook.addEventListener('click', (evt)=>{
    evt.preventDefault();
    addBookToLibrary();
    newRow();
    fillRow(myLibrary[myLibrary.length-1],newRow());
    form.classList.add('hide');
})


