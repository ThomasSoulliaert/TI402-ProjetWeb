window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 0) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});