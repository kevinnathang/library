const myLibrary = [];
const displayBook = document.getElementById("displayBook");
const addNewBookBtn = document.getElementById("addNewBookBtn");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("closeModalBtn");
const submit = document.getElementById("submitBookBtn");

addNewBookBtn.addEventListener("click", function () {
  dialog.showModal();
});

closeBtn.addEventListener("click", function () {
  dialog.close();
});

submit.addEventListener("click", addNewBook);

//Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleReadStatus = function () {
    this.read = !this.read; // Toggle the read status
  };
}

function addNewBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const book = new Book(title, author, pages, false);
  addBookToLibrary(book);
  displayBookFunc(myLibrary);
  dialog.close();
}

//Push new books into myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//Create book cards to display
function displayBookFunc(bookArray) {
  // Clear previous content in the displayBook div
  displayBook.innerHTML = "";

  for (let i = 0; i < bookArray.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    const bookToggleRead = document.createElement("button");
    bookToggleRead.classList.add("toggleRead");
    bookToggleRead.textContent = "Toggle read status";
    const removeBook = document.createElement("button");
    removeBook.classList.add("removeBookBtn");
    removeBook.textContent = "Remove Book";

    // Store the book index as a data attribute to use later
    bookToggleRead.dataset.index = i;

    removeBook.addEventListener("click", function () {
      myLibrary.splice(i, 1); // Remove the book from the library
      displayBookFunc(myLibrary); // Update the display after removal
    });

    // Add event listener to toggle the read status
    bookToggleRead.addEventListener("click", function () {
      const index = this.dataset.index;
      myLibrary[index].toggleReadStatus();
      displayBookFunc(myLibrary); // Update the display after toggling status
    });

    // Display book information
    bookDiv.innerHTML = `
        <strong>Title:</strong> ${bookArray[i].title}<br>
        <strong>Author:</strong> ${bookArray[i].author}<br>
        <strong>Pages:</strong> ${bookArray[i].pages}<br>
        <strong>Read:</strong> ${bookArray[i].read ? "Yes" : "No"}<br>
      `;

    bookDiv.appendChild(bookToggleRead);
    bookDiv.appendChild(removeBook);
    displayBook.appendChild(bookDiv);
  }
}

//Sample books testing
const book1 = new Book("The Republic", "Plato", 340, false);
const book2 = new Book(
  "The Count of Monte Cristo",
  "Alexandre Dumas",
  1160,
  false
);

book1.toggleReadStatus();
addBookToLibrary(book1);
addBookToLibrary(book2);
displayBookFunc(myLibrary);
