
// Library Init & Seed/////////////////////////
let myLibrary = [{title:"The Hobbit", author:'Tolkien', year:'1948', read:'read', bookId: 0}];
//////////////////////////////////////////////



// Selection ///////////////////////
const table = document.querySelector('tbody');
const form = document.querySelector('form');
const inpTitle = document.querySelector('#title');
const inpAuthor = document.querySelector('#author');
const inpYear = document.querySelector('#year');
const inpStatus = document.querySelector('#status');
const newBook = document.querySelector('.new button');
const saveBook = document.querySelector('form button');
//////////////////////////////////////


// Book prototype constructor /////////////
function Book(title,author,pages,read, bookId){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookId = bookId;
}
/////////////////////////////////////

// Init book ids
let id = 0; 
////////////////////////


// Seeding
fillTable(myLibrary);
////////////////////////////

// Take Form input values and create a Book instance, increment bookId with each new book, populate myLibrary with new book 
function addBookToLibrary(lib){
    const bookTitle = inpTitle.value;
    const bookAuthor = inpAuthor.value;
    const bookYear = inpYear.value;
    const bookRead = inpStatus.value;
    const bookId = id+1;
    const book = new Book(bookTitle, bookAuthor, bookYear, bookRead, bookId);
    lib.push(book);
}
/////////////////////////////////////////////////////


// fill <tbody> with new row by using fillrow() one row for each book in myLibrary
function fillTable(lib){
    for(let book of lib){
        fillRow(book, newRow());
    }
}
///////////////////////////////////////////////////////////////


// Create <tr> element and return it
function newRow(){
    const row = document.createElement('tr');
    table.append(row);
    return row;
}
///////////////////////////////////////


// take an empty row and fill it with book properties by creating a <th> element for the title and <td> for the rest
// Give each new row it's id the same as bookId
function fillRow(book, row){
    for(let key in book){
        if(book.hasOwnProperty(key)){
            if(key == 'bookId') break;
            if(key == 'title' ) {
                const tHead = document.createElement('th');
                tHead.textContent = book[key];
                row.append(tHead);
                continue;
            }
            const tData = document.createElement('td');
            tData.textContent = book[key];
            row.append(tData);
            row.dataset.id = book.bookId;
        }
    }
    addButtons(book.bookId);
}
////////////////////////////////////////////////////////////


// Adding buttons to each row
// Delete button X calls removal() which removes <tr> and the corresponding book from myLibrary all three connected
// with the same id
// check button calls editStatus() that toggles book.read property from 'read' to 'not read' and vice versa
function addButtons(id){
    const tHead = document.querySelector('tbody tr:last-child th');
    const X = document.createElement('button');
    X.addEventListener('click', ()=>{
        document.querySelector(`[data-id="${X.dataset.id}"]`).remove();
        removal(X.dataset.id);
    })
    X.textContent = 'x';
    X.dataset.id = id;
    tHead.append(X);

    const status = document.querySelector('tbody tr:last-child td:last-child');
    const check = document.createElement('button');
    check.textContent = 'edit';
    check.dataset.id = id;
    check.addEventListener('click', function(){
        status.innerHTML = `${editStatus(this)}<button data-id="0">edit</button>`;
    })
    status.appendChild(check);
}
/////////////////////////////////////////////////////



// newBook button makes the form visible
newBook.addEventListener('click', ()=>{
    form.classList.remove('hide');
})
////////////////////////////////////////////


// save form submit button calls addbookToLibrary() and fills a new row with the latest myLibrary book
saveBook.addEventListener('click', (evt)=>{
    evt.preventDefault();
    addBookToLibrary(myLibrary);
    fillRow(myLibrary[myLibrary.length-1],newRow());
    form.classList.add('hide');
})
/////////////////////////////////////////////////////


// removes by filtering the book with the same id as the button 
// refresh() + filltable() combination are used to reset the button events
function removal(id){
    const newLib = myLibrary.filter(book => !book.bookId == id);
    myLibrary = newLib;
    refresh();
    fillTable(myLibrary);
}
/////////////////////////////////////////////////////////


// find the book with the same button id and change it's read property
// return the status to use in the display
function editStatus(button){
    let currentBook = myLibrary.find(book => button.dataset.id == book.bookId);
    currentBook.read == `read` ? currentBook.read = 'not read' :
    currentBook.read == 'not read' ? currentBook.read = 'read' : currentBook.read = 'not read';
    refresh();
    fillTable(myLibrary);
    return currentBook;
}
////////////////////////////////////////////////////////////////////////

// remove everything in <tbody> ////////////////////////////////
function refresh(){
    document.querySelectorAll('tbody *').forEach(elm => elm.remove());
}
//////////////////////////////////////////////
