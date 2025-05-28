document.querySelector('#especes-2-section form').addEventListener('change', function () {
    // Récupère les valeurs actuelles des différents filtres dans le formulaire
    const famille = document.getElementById('famille_espece').value;
    const menace = document.getElementById('niveau_menace').value;
    const zone = document.getElementById('zone_geo').value;
    const taille = document.getElementById('taille_espece').value;

    // Sélectionne tous les éléments animaux dans la section "#especes-3-section"
    const animaux = document.querySelectorAll('#especes-3-section > div');

    // Pour chaque élément animal, on vérifie s'il correspond aux filtres sélectionnés
    animaux.forEach(animal => {
        const familleAnimal = animal.getAttribute('dataFamille');
        const menaceAnimal = animal.getAttribute('dataMenace');
        const zoneAnimal = animal.getAttribute('dataZone') || ''; // Récupère la zone, qui peut contenir plusieurs zones séparées par des virgules
        const zoneList = zoneAnimal.split(',').map(z => z.trim()); // Transforme la chaîne en tableau de zones, en supprimant les espaces superflus
        const tailleAnimal = animal.getAttribute('dataTaille');

        // Compare chaque filtre avec les données de l'animal :
        // - Si le filtre est vide, on considère qu'il correspond toujours (pas de restriction)
        // - Sinon, on teste si la donnée de l'animal correspond au filtre
        const matchFamille = !famille || famille === familleAnimal;
        const matchMenace = !menace || menace === menaceAnimal;
        const matchZone = !zone || zoneList.includes(zone);
        const matchTaille = !taille || taille === tailleAnimal;

        if (matchFamille && matchMenace && matchZone && matchTaille) { // Si l'animal correspond à tous les critères, on l'affiche
            animal.style.display = '';
        } else { // Sinon, on le masque
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
  
    // Déclencher un changement (ici, on met à jour l'affichage)
    document.querySelector('#especes-2-section form').dispatchEvent(new Event('change'));
});