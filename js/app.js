/*

# Further features:

1.Add title
2.Mark as important
3.Separate notes by user
4.Sync and host to web server

*/

console.log("this is a practice of note app");
showNotes();

// adding the note....

let addBtn = document.getElementById("addBtn");
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");

addBtn.addEventListener("click", (e) => {
  if (addTitle.value.length != 0 && addTxt.value.length != 0) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let myObj = {
      title: addTitle.value,
      text: addTxt.value,
      color: "white",
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showNotes();
    document.getElementById("notice").innerText = " ";
  } else {
    document.getElementById(
      "notice"
    ).innerHTML = `<b>Please fill both Title and Note above !<b/>`;
  }
});

// showing the note

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesElm = document.getElementById("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach((element, index) => {
    html += `
      <div class="noteCard mx-3 my-3 card" style="width: 18rem">
          <div class="card-body">
            <h3 style="background-color:${
              element.color
            }"  class="card-title"> ${element.title.toUpperCase()}</h3>
            <hr/>
            <p class="card-text">
              ${element.text}
            </p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-primary btn-sm">Delete Note</button>

            
          </div>
        </div>
      `;
  });

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show ! Use "Add Note" above to create a note.`;
  }
}

// deleting the note

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// search function

let search = document.getElementById("searchTxt");

search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
