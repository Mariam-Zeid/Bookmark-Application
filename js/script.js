// !================ Implementing the main variables we will use ================

// ? Form Varibales
let siteTitleInput = document.querySelector("#siteTitle");
let siteUrlInput = document.querySelector("#siteUrl");
let siteDescriptionInput = document.querySelector("#siteDescription");
const addSiteBtn = document.querySelector("#addSite");
const updateSiteBtn = document.querySelector("#updateSite");
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

// !================================ Validation ================================

// ? Adding a specific title pattern for the site name (return boolean value)
siteTitleInput.addEventListener("change", function () {
  titleInput = siteTitleInput.value.trim();
  // 0 to 2 occurrences of a space followed with one or more ASCII letters
  const titlePattern = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
  titleValidation = titlePattern.test(titleInput) ? true : false;
  console.log(titleValidation);
});

// ? Adding only valid URL (return boolean value)
siteUrlInput.addEventListener("change", function () {
  let urlInput = siteUrlInput.value.trim();
  // Validate the URL
  const urlPattern =
    /^(https?|ftp):\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\/]*)*$/;

  // Make https:// optional if not provided
  if (!urlInput.startsWith("https://") && !urlInput.startsWith("http://")) {
    urlInput = `https://${urlInput}`;
    siteUrlInput.value = urlInput;
    console.log(siteUrlInput.value);
  }

  urlValidation = urlPattern.test(urlInput) ? true : false;
  console.log(urlValidation);
});

// ? Closing alert for each specified modal (Success - Warning - Error)
for (let i = 0; i < closeAlertBtns.length; i++) {
  closeAlertBtns[i].addEventListener("click", function (e) {
    alertModals[i].classList.replace("d-flex", "d-none");
  });
}

function validateSite(site, index) {
  if (site.siteTitle === "" || site.siteURL === "") {
    warningAlert.classList.replace("d-none", "d-flex");
    return false;
  } else if (titleValidation && !urlValidation) {
    errorMessage.innerHTML = "Invalid URL";
    errorAlert.classList.replace("d-none", "d-flex");
    return false;
  } else if (!titleValidation && urlValidation) {
    errorMessage.innerHTML = "Invalid Name";
    errorAlert.classList.replace("d-none", "d-flex");
    return false;
  } else if (!titleValidation && !urlValidation) {
    errorMessage.innerHTML = "Ensure all fields are filled correctly";
    errorAlert.classList.replace("d-none", "d-flex");
    return false;
  }
  return true;
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
  for (
    let bookMarkIndex = 0;
    bookMarkIndex < bookmarksList.length;
    bookMarkIndex++
  ) {
    bookmarksStr += `<div class="col-12">
          <div class="bookmark-site p-3 mx-auto d-flex align-items-center justify-content-between gap-4">
            <div class="site-info">
              <h4 class="site-title">${bookmarksList[bookMarkIndex].siteTitle}</h4>
              <p class="bookmark-desc">${bookmarksList[bookMarkIndex].siteDesc}</p>
            </div>
            <div class="site-action d-flex align-items-center gap-3">
              <a onclick="visitSiteBtn(${bookMarkIndex})"><i class="fa-solid fa-link"></i></a>
              <i class="fa-solid fa-pen" onclick="editSiteBtn(${bookMarkIndex})"></i>
              <i class="fa-solid fa-trash" onclick="deleteSiteBtn(${bookMarkIndex})"></i>
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
  if (validateSite(bookmark)) {
    successAlert.classList.replace("d-none", "d-flex");
    bookmarksList.push(bookmark);
    displayBookmarks();
    clearInputs();
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
  }
});

// ? Accessing a website using its URL.
function visitSiteBtn(siteIndex) {
  let sitePath = bookmarksList[siteIndex].siteUrl;
  window.open(sitePath, "_blank");
}

// ? Deleting site from the bookmarks list
function deleteSiteBtn(siteIndex) {
  bookmarksList.splice(siteIndex, 1);
  displayBookmarks();
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
}

// ? Taking values from the bookmarks list to edit the bookmark
function editSiteBtn(siteIndex) {
  currentSiteIndex = siteIndex;
  siteTitleInput.value = bookmarksList[siteIndex].siteTitle;
  siteUrlInput.value = bookmarksList[siteIndex].siteUrl;
  siteDescriptionInput.value = bookmarksList[siteIndex].siteDesc;

  updateSiteBtn.classList.remove("d-none");
  addSiteBtn.classList.add("d-none");
}

// ? Sending values back to the bookmarks list to make updates to the bookmark.
updateSiteBtn.addEventListener("click", function () {
  let updatedSite = {
    siteTitle: siteTitleInput.value,
    siteUrl: siteUrlInput.value,
    siteDesc: siteDescriptionInput.value,
  };

  if (validateSite(updatedSite, currentSiteIndex)) {
    successMessage.innerHTML = `Site has been updated Successfully`;
    successAlert.classList.replace("d-none", "d-flex");
    bookmarksList[currentSiteIndex] = updatedSite;
    displayBookmarks();
    clearInputs();
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));
    updateSiteBtn.classList.add("d-none");
    addSiteBtn.classList.remove("d-none");
  }
});
