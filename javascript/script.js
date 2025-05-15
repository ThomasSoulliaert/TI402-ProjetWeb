/* Header */

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});


/* Espèces */
document.getElementById('filter-form').addEventListener('change', function() {
  const type = document.getElementById('type-espece').value;
  const menace = document.getElementById('niveau-menace').value;

  const animaux = document.querySelectorAll('.animal');

  animaux.forEach(animal => {
    const typeAnimal = animal.getAttribute('data-type');
    const menaceAnimal = animal.getAttribute('data-menace');

    // On montre seulement si correspond aux 2 filtres (ou filtres vides)
    const matchType = !type || type === typeAnimal;
    const matchMenace = !menace || menace === menaceAnimal;

    if (matchType && matchMenace) {
      animal.style.display = '';
    } else {
      animal.style.display = 'none';
    }
  });
});

// Effacer les filtres : remise à zéro de tous les selects
document.getElementById('reset-filters').addEventListener('click', function() {
  document.getElementById('type-espece').value = '';
  document.getElementById('niveau-menace').value = '';
  // Trigger changement pour afficher tous
  document.getElementById('filter-form').dispatchEvent(new Event('change'));
});
