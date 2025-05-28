/* Header */

// Evénement qui se déclenche à chaque fois que l'utilisateur fait défiler la page
window.addEventListener("scroll", function () {
    const header = document.querySelector("header"); // Sélectionne l'élément <header> dans la page
    
    // Si la position verticale du défilement (scrollY) est supérieure à 0
    if (window.scrollY > 0) {
        header.classList.add("shrink"); // Si oui, ajoute la classe "shrink" au header (réduit la taille et change le style en fonction du css)
    } else {
        header.classList.remove("shrink"); // Sinon (quand on est en haut de la page), on retire la classe "shrink"
    }
});