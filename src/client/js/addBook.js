/* Global Variables  */
const addBookBtn = document.getElementById("add-book-btn");
const tBody = document.getElementById("book-list-body");
const cityName = document.getElementById("city");
const leaving = document.getElementById("leaving-date");
const returnDate = document.getElementById("return-date");

const addBook = () => {
  let data = {
    cityName: cityName.value,
    leaving: leaving.value,
    returnDate: returnDate.value,
    btn: "",
  };

  addBookItem(data);
  return;
};

const addBookItem = (data) => {
  const book = Object.values(data);
  let newRow = document.createElement("tr");
  for (let i = 0; i < book.length; i++) {
    let Td = document.createElement("td");
    if (i === 3) {
      Td.innerHTML = `<span href="#"class="btn btn-danger btn-sm delete">X</span`;
    } else {
      Td.innerText = book[i];
    }

    newRow.append(Td);
  }

  tBody.append(newRow);
};

const deleteBook = (el) => {
  el.classList.contains("delete")
    ? el.parentElement.parentElement.remove()
    : "";
};

//event
const addToBookList = addBookBtn.addEventListener("click", () => {
  addBook();
});

tBody.addEventListener("click", (e) => {
  deleteBook(e.target);
});

export { addBook, addToBookList };
