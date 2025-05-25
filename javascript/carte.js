const map = L.map('map', {
    center: [0, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    worldCopyJump: true,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

const zones = [
    { nom: "Anguille d’Europe, Baleine Bleue, Dauphin, Thon Rouge, Tortue luth", coords: [0, -30] }, // Océan Atlantique
    { nom: "Anguille d’Europe, Dauphin", coords: [38, 16] }, // Méditerranée
    { nom: "Baleine Bleue, Dauphin, Dugong, Hippocampe moucheté, Mérou géant, Otarie à fourrure du Nord, Poisson Napoléon, Thon Rouge, Tortue luth", coords: [0, -150] }, // Océan Pacifique
    { nom: "Béluga, Orque", coords: [85, 0] }, // Océan Arctique
    { nom: "Crabe, Raie manta géante, Requin marteau, Tortue luth", coords: [0, 0] }, // Tropiques
    { nom: "Crabe, Dodo, Dugong, Hippocampe moucheté, Mérou géant, Poisson Napoléon", coords: [-10, 80] }, // Océan Indien
    { nom: "Coelacanthe", coords: [-5, 40] }, // Afrique de l'Est
    { nom: "Coelacanthe", coords: [-2, 118] }, // Indonésie
    { nom: "Dauphin de Chine (baiji)", coords: [31, 112] }, // Fleuve Yangtsé
    { nom: "Éponge de verre, Grenadier vitrier, Méduse immortelle", coords: [0, -30] }, // Abysses
    { nom: "Limule", coords: [5, 105] }, // Asie du Sud-Est
    { nom: "Limule", coords: [10, -70] }, // Amérique
    { nom: "Manchot empereur", coords: [-75, 0] }, // Antarctique
    { nom: "Phoque moine d’Hawaï", coords: [20, -157] }, // Hawaï
    { nom: "Poisson Napoléon", coords: [20, 38] }, // Mer Rouge
    { nom: "Saumon de l'Atlantique", coords: [40, -40] }, // Océan Atlantique Nord
    { nom: "Steller's sea cow", coords: [60, -175] } // Mer de Béring
];

zones.forEach(zone => {
    L.marker(zone.coords)
        .addTo(map)
        .bindPopup(zone.nom);
});