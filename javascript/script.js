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
  const famille = document.getElementById('famille_espece').value;
  const menace = document.getElementById('niveau_menace').value;
  const zone = document.getElementById('zone_geo').value;
  const taille = document.getElementById('taille_espece').value;

  const animaux = document.querySelectorAll('.animal');

  animaux.forEach(animal => {
    const familleAnimal = animal.getAttribute('dataFamille');
    const menaceAnimal = animal.getAttribute('dataMenace');
    const zoneAnimal = animal.getAttribute('dataZone');
    const tailleAnimal = animal.getAttribute('dataTaille');

    // On montre seulement si correspond aux 2 filtres (ou filtres vides)
    const matchFamille = !famille || famille === familleAnimal;
    const matchMenace = !menace || menace === menaceAnimal;
    const matchZone = !zone || zone === zoneAnimal;
    const matchTaille = !taille || taille === tailleAnimal;

    if (matchFamille && matchMenace && matchZone && matchTaille) {
      animal.style.display = '';
    } else {
      animal.style.display = 'none';
    }
  });
});

// Effacer les filtres : remise à zéro de tous les selects
document.getElementById('reset-filters').addEventListener('click', function() {
  document.getElementById('famille_espece').value = '';
  document.getElementById('niveau_menace').value = '';
  document.getElementById('zone_geo').value = '';
  document.getElementById('taille_espece').value = '';
  // Trigger changement pour afficher tous
  document.getElementById('filter-form').dispatchEvent(new Event('change'));
});