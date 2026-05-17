let books = JSON.parse(localStorage.getItem("books")) || [];

let issuedBooks =
  JSON.parse(localStorage.getItem("issuedBooks")) || [];

let selectedBook = null;

function renderBooks(data = books){

  let container =
    document.getElementById("books");

  container.innerHTML = "";

  data.forEach(book=>{

    container.innerHTML += `

      <div class="book">

        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop"
        >

        <div class="book-content">

          <h2>${book.title}</h2>

          <p>
            <b>Author:</b>
            ${book.author}
          </p>

          <p>
            <b>Category:</b>
            ${book.category}
          </p>

          <p>
            <b>Available:</b>
            ${book.quantity}
          </p>

          <button onclick="openModal(${book.id})">
            Issue Book
          </button>

        </div>

      </div>

    `;
  });
}

function searchBooks(){

  let value =
    document.getElementById("search")
    .value
    .toLowerCase();

  let filtered = books.filter(book=>

    book.title.toLowerCase().includes(value) ||

    book.author.toLowerCase().includes(value) ||

    book.category.toLowerCase().includes(value)

  );

  renderBooks(filtered);
}

function openModal(bookId){

  selectedBook =
    books.find(book=>book.id === bookId);

  document
    .getElementById("modal")
    .classList
    .remove("hidden");
}

function closeModal(){

  document
    .getElementById("modal")
    .classList
    .add("hidden");
}

function submitIssue(){

  let name =
    document.getElementById("studentName").value;

  let usn =
    document.getElementById("studentUSN").value;

  let email =
    document.getElementById("studentEmail").value;

  let date =
    document.getElementById("issueDate").value;

  if(
    name === "" ||
    usn === "" ||
    email === "" ||
    date === ""
  ){
    alert("Please fill all fields");
    return;
  }

  if(selectedBook.quantity <= 0){
    alert("Book not available");
    return;
  }

  let issueData = {

    studentName:name,
    studentUSN:usn,
    studentEmail:email,
    issueDate:date,

    bookTitle:selectedBook.title

  };

  issuedBooks.push(issueData);

  localStorage.setItem(
    "issuedBooks",
    JSON.stringify(issuedBooks)
  );

  selectedBook.quantity--;

  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );

  renderBooks();

  renderHistory();

  closeModal();

  alert("Book Issued Successfully");

  document.getElementById("studentName").value = "";
  document.getElementById("studentUSN").value = "";
  document.getElementById("studentEmail").value = "";
  document.getElementById("issueDate").value = "";
}

function renderHistory(){

  let table =
    document.getElementById("historyTable");

  table.innerHTML = "";

  issuedBooks.forEach(issue=>{

    table.innerHTML += `

      <tr>

        <td>${issue.studentName}</td>

        <td>${issue.studentUSN}</td>

        <td>${issue.studentEmail}</td>

        <td>${issue.bookTitle}</td>

        <td>${issue.issueDate}</td>

      </tr>

    `;
  });
}

function showSection(section){

  document
    .getElementById("booksSection")
    .classList
    .add("hidden");

  document
    .getElementById("historySection")
    .classList
    .add("hidden");

  document
    .getElementById(section)
    .classList
    .remove("hidden");
}

renderBooks();

renderHistory();