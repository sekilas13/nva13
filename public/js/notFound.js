const back = document.querySelector("a");

back.addEventListener("click", (e) => {
  e.preventDefault();
  history.back();
});
