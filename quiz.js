window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

