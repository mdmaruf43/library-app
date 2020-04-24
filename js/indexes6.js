class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// Add methods to display prototype
class Display {
    add(book) {
        let tableBody = document.getElementById('tableBody');
        let uiString = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>
        `
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldTxt;
        if (type === 'success') {
            boldTxt = 'Success';
        } else {
            boldTxt = 'Error';
        }
        message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${boldTxt}:</strong> ${displayMessage}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
        setTimeout(() => {
            message.innerHTML = '';
        }, 2000)
    }
}

// function showTableData() {
//     let tableData = localStorage.getItem('tableBody');
//     let tableDataObj;
//     if (tableData == null) {
//         tableDataObj = [];
//     } else {
//         tableDataObj = JSON.parse(tableData);
//     }
//     let uiString;
//     tableDataObj.forEach(function () {
//         uiString += `
//         <tr>
//             <td>${book.name}</td>
//             <td>${book.author}</td>
//             <td>${book.type}</td>
//         </tr>
//     `
//     });
//     console.log(tableDataObj);
//     let tableElm = document.getElementById('tableBody');
//     if (tableDataObj.length != 0) {
//         tableElm.innerHTML = uiString;
//     } else {
//         tableElm.innerHTML = 'Nothing added Yet';
//     }
// }

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else {
        type = cooking.value;
    }
    // let formData = localStorage.getItem('tableBody');
    // let formDataObj;
    // if (formData == null) {
    //     formDataObj = [];
    // } else {
    //     formDataObj = JSON.parse(formData);
    // }
    // formDataObj.push(name, author, type);
    // localStorage.setItem('tableBody', JSON.stringify(formDataObj));
    // console.log(formDataObj);
    let book = new Book(name, author, type);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');
    } else {
        display.show('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}