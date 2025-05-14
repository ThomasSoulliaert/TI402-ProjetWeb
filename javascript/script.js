window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});


/* Espèces */

const filtres = document.querySelectorAll('.filtre');
const resetBtn = document.getElementById('reset-filtres');
const animaux = document.querySelectorAll('.animal');

function filtrerAnimaux() {
    const filtresActifs = Array.from(filtres)
      .filter(f => f.checked)
      .map(f => f.value);

    animaux.forEach(animal => {
      const tags = animal.dataset.tags.split(' ');
      const visible = filtresActifs.every(f => tags.includes(f));
      animal.style.display = visible || filtresActifs.length === 0 ? 'block' : 'none';
    });
  }

  filtres.forEach(f => f.addEventListener('change', filtrerAnimaux));

  resetBtn.addEventListener('click', () => {
    filtres.forEach(f => f.checked = false);
    filtrerAnimaux();
});