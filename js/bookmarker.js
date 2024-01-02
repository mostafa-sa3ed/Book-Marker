var bookMarkName = document.getElementById("bookmarkName");
var websiteURL = document.getElementById("bookmarkURL");
var btnSubmit = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var visitBtn = document.getElementById("visitBtn");
var boxModal = document.querySelector(".box-info");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");

var bookMarkeList = []; //list store bookmark

if (localStorage.getItem("bookmark") != null) {
  bookMarkeList = JSON.parse(localStorage.getItem("bookmark"));
  display();
}

btnSubmit.addEventListener("click", function () {
  if (validUrl() && validName() == true) {
    var bookmark = {
      name: bookMarkName.value,
      url: websiteURL.value,
    };
    bookMarkeList.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookMarkeList)); //add data in localstorage
    display();
    clearData();
  } else {
    // alert("Site Name or Url is not valid");
    boxModal.classList.remove("d-none");
  }
});

//add bookmark
function display() {
  var marks = ``;

  for (var i = 0; i < bookMarkeList.length; i++) {
    var x = [i];
    marks += `
    <tr>
    <td>${++x}</td>
    <td>${bookMarkeList[i].name}</td>
    <td>
    
      <button onclick="visitUrl(${i})" class="btn" id="visitBtn">
        <i class="fa-solid fa-eye"></i> Visit
      </button>
    
    </td>
    <td>
      <button onclick="updateBookMark(${i})" class="btn btn-warning text-white" >
      <i class="fa-regular fa-pen-to-square"></i> Update
      </button>
    </td>
    <td>
      <button onclick="deleteBookMark(${i})" class="btn bg-danger text-white" id="deleteBtn">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>`;
  }
  tableContent.innerHTML = marks;
}
//delete function
function deleteBookMark(index) {
  bookMarkeList.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkeList));
  display();
}
//clear function
function clearData() {
  bookMarkName.value = "";
  websiteURL.value = "";
}

//update
var globalIndex;
function updateBookMark(updateIndex) {
  globalIndex = updateIndex;
  btnSubmit.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  bookMarkName.value = bookMarkeList[updateIndex].name;
  websiteURL.value = bookMarkeList[updateIndex].url;
}
function finalUpdateBookMark() {
  bookMarkeList[globalIndex].name = bookMarkName.value;
  bookMarkeList[globalIndex].url = websiteURL.value;
  btnSubmit.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  display();
  clearData();
}
//search function
function search(value) {
  marks = ``;
  var x = 0;
  for (var i = 0; i < bookMarkeList.length; i++) {
    if (bookMarkeList[i].name.toLowerCase().includes(value.toLowerCase())) {
      marks += `
        <tr>
    <td>${++x}</td>
    <td>${bookMarkeList[i].name}</td>
    <td>
    <a href="${bookMarkeList[i].url}" target=”_blank” >
      <button class="btn" id="visitBtn">
        <i class="fa-solid fa-eye"></i> Visit
      </button>
    </a>
    </td>
    <td>
      <button onclick="updateBookMark(${i})" class="btn btn-warning text-white" >
      <i class="fa-regular fa-pen-to-square"></i> Update
      </button>
    </td>
    <td>
      <button onclick="deleteBookMark(${i})" class="btn bg-danger text-white" id="deleteBtn">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>
        `;
    }
  }
  tableContent.innerHTML = marks;
}
//validation function
function validUrl() {
  var pattern = /^www\.[^\s\/$.?#].[^\s]*$/;
  return pattern.test(websiteURL.value);
}

function validName() {
  var pattern = /^.{3,}$/;
  return pattern.test(bookMarkName.value);
}
//visit function
function visitUrl(urlIndex) {
  window.open(`https://${bookMarkeList[urlIndex].url}`);
}

//Close Modal Function

function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);
