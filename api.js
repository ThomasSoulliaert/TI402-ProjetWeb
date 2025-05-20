// api.js
document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonnées de Paris

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([48.8566, 2.3522])
        .addTo(map)
        .bindPopup('Paris, France')
        .openPopup();
});
