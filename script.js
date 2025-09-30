const modelBtn = document.getElementById("model");
const loginOverlay = document.getElementById("loginOverlay");

modelBtn.addEventListener("click", () => {
  loginOverlay.style.display = "flex";
  
});

function closePopup(id) {
  document.getElementById(id).style.display = "none";
  
}

function switchPopup(closeId, openId) {
  document.getElementById(closeId).style.display = "none";
  document.getElementById(openId).style.display = "flex";
}


