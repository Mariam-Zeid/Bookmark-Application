// !================ Implementing the main variables we will use ================

// ? Form Varibales
let siteTitleInput = document.querySelector("#siteTitle");
let siteUrlInput = document.querySelector("#siteUrl");
let siteDescriptionInput = document.querySelector("#siteDescription");
const addSiteBtn = document.querySelector("#addSite");
const udpateSiteBtn = document.querySelector("#updateSite");
let currentSiteIndex; // used for the Update button

// ? Alert Modal Variables
const alertModals = document.querySelectorAll(".alert-modal"); // NodeList of alert modals
const successAlert = document.querySelector("#successAlert");
const warningAlert = document.querySelector("#warningAlert");
const errorAlert = document.querySelector("#errorAlert");
const successMessage = document.querySelector("#successMessage");
const errorMessage = document.querySelector("#errorMessage");
const closeAlertBtns = document.querySelectorAll(".alert-btn"); // NodeList of alert btns

// ? Bookmark varibales
const emptySiteList = document.querySelector("#emptySiteList");
const sitesData = document.querySelector("#sitesData");
const bookmarkDesc = document.querySelector(".bookmark-desc");

// ? Validation varibales
let titleValidation;
let urlValidation;

let bookmarksList = [];
displayBookmarks();
if (localStorage.getItem("bookmarksList") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks();
}

// !================================ Functions ================================

// ? Displaying and Hiding the message for an empty list
function hideGhost() {
  if (bookmarksList.length === 0) {
    emptySiteList.classList.remove("d-none");
    sitesData.classList.add("d-none");
  } else {
    emptySiteList.classList.add("d-none");
    sitesData.classList.remove("d-none");
  }
}

// Displaying the ghost if there is no sites in the bookmarksL
displayBookmarks();

// ? Showing the bookmarks to the user
function displayBookmarks() {
  let bookmarksStr = "";
  for (let i = 0; i < bookmarksList.length; i++) {
    bookmarksStr += `<div class="col-12">
          <div class="bookmark-site p-3 mx-auto d-flex align-items-center justify-content-between gap-4">
            <div class="site-info">
              <h4 class="site-title">${bookmarksList[i].siteTitle}</h4>
              <p class="bookmark-desc">${bookmarksList[i].siteDesc}</p>
            </div>
            <div class="site-action d-flex align-items-center gap-3">
              <a><i class="fa-solid fa-link"></i></a>
              <i class="fa-solid fa-pen"></i>
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>`;
  }
  // invoking the function
  hideGhost();
  sitesData.innerHTML = bookmarksStr;
}

// ? Clearing all the input fields
function clearInputs() {
  siteTitleInput.value = "";
  siteUrlInput.value = "";
  siteDescriptionInput.value = "";
}

// ? Adding site to the bookmarks list
addSiteBtn.addEventListener("click", function () {
  let bookmark = {
    siteTitle: siteTitleInput.value,
    siteUrl: siteUrlInput.value,
    siteDesc: siteDescriptionInput.value,
  };
  bookmarksList.push(bookmark);
  displayBookmarks();
  clearInputs();
  localStorage.setItem("siteList", JSON.stringify(bookmarksList));
});
