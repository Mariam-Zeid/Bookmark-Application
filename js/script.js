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

