/* Header */

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});


// Espèces
document.querySelector('#especes-2-section form').addEventListener('change', function () {
    const famille = document.getElementById('famille_espece').value;
    const menace = document.getElementById('niveau_menace').value;
    const zone = document.getElementById('zone_geo').value;
    const taille = document.getElementById('taille_espece').value;

    const animaux = document.querySelectorAll('#especes-3-section > div');

    animaux.forEach(animal => {
        const familleAnimal = animal.getAttribute('dataFamille');
        const menaceAnimal = animal.getAttribute('dataMenace');
        const zoneAnimal = animal.getAttribute('dataZone') || '';
        const zoneList = zoneAnimal.split(',').map(z => z.trim());
        
        
        const tailleAnimal = animal.getAttribute('dataTaille');

        const matchFamille = !famille || famille === familleAnimal;
        const matchMenace = !menace || menace === menaceAnimal;
        const matchZone = !zone || zoneList.includes(zone);
        const matchTaille = !taille || taille === tailleAnimal;

        if (matchFamille && matchMenace && matchZone && matchTaille) {
          animal.style.display = '';
        } else {
          animal.style.display = 'none';
        }
    });
});

// Effacer les filtres
document.getElementById('reset-filters').addEventListener('click', function () {
    document.getElementById('famille_espece').value = '';
    document.getElementById('niveau_menace').value = '';
    document.getElementById('zone_geo').value = '';
    document.getElementById('taille_espece').value = '';
  
    // Déclencher un changement
    document.querySelector('#especes-2-section form').dispatchEvent(new Event('change'));
});

