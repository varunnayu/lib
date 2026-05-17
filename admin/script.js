let books = JSON.parse(localStorage.getItem("books")) || [];

let issuedBooks =
  JSON.parse(localStorage.getItem("issuedBooks")) || [];

saveBooks();

function saveBooks(){

  localStorage.setItem(
    "books",
    JSON.stringify(books)
  );

  renderBooks();

  renderIssuedBooks();

  updateDashboard();
}

function renderBooks(){

  let table =
    document.getElementById("bookTable");

  table.innerHTML = "";

  books.forEach((book,index)=>{

    table.innerHTML += `

      <tr>

        <td>${book.id}</td>

        <td>${book.title}</td>

        <td>${book.author}</td>

        <td>${book.category}</td>

        <td>${book.quantity}</td>

        <td>

          <button
            class="action-btn edit"
            onclick="editBook(${index})"
          >
            Edit
          </button>

          <button
            class="action-btn delete"
            onclick="deleteBook(${index})"
          >
            Delete
          </button>

        </td>

      </tr>

    `;
  });
}

function renderIssuedBooks(data = issuedBooks){

  let table =
    document.getElementById("issuedTable");

  table.innerHTML = "";

  data.forEach(issue=>{

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

function updateDashboard(){

  document.getElementById("totalBooks")
    .innerText = books.length;

  let total = 0;

  books.forEach(book=>{
    total += Number(book.quantity);
  });

  document.getElementById("availableBooks")
    .innerText = total;

  document.getElementById("issuedCount")
    .innerText = issuedBooks.length;
}

function openModal(){

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

function addBook(){

  let title =
    document.getElementById("title").value;

  let author =
    document.getElementById("author").value;

  let category =
    document.getElementById("category").value;

  let quantity =
    document.getElementById("quantity").value;

  if(title === "" || author === ""){

    alert("Fill all fields");

    return;
  }

  books.push({

    id:Date.now(),

    title,
    author,
    category,
    quantity

  });

  saveBooks();

  closeModal();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("quantity").value = "";
}

function deleteBook(index){

  if(confirm("Delete this book?")){

    books.splice(index,1);

    saveBooks();
  }
}

function editBook(index){

  let book = books[index];

  let newTitle =
    prompt("Edit Title", book.title);

  if(newTitle){

    books[index].title = newTitle;

    saveBooks();
  }
}

function searchBooks(){

  let value =
    document.getElementById("search")
    .value
    .toLowerCase();

  let rows =
    document.querySelectorAll("#bookTable tr");

  rows.forEach(row=>{

    row.style.display =

      row.innerText
      .toLowerCase()
      .includes(value)

      ? ""

      : "none";
  });
}

function searchIssuedBooks(){

  let value =
    document.getElementById("issueSearch")
    .value
    .toLowerCase();

  let filtered = issuedBooks.filter(issue=>

    issue.studentName
      .toLowerCase()
      .includes(value)

    ||

    issue.studentUSN
      .toLowerCase()
      .includes(value)

    ||

    issue.bookTitle
      .toLowerCase()
      .includes(value)

  );

  renderIssuedBooks(filtered);
}

function showSection(section){

  document
    .getElementById("dashboard")
    .classList
    .add("hidden");

  document
    .getElementById("books")
    .classList
    .add("hidden");

  document
    .getElementById("issuedBooks")
    .classList
    .add("hidden");

  document
    .getElementById(section)
    .classList
    .remove("hidden");
}

renderBooks();

renderIssuedBooks();

updateDashboard();