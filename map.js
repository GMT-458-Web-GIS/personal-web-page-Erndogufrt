document.addEventListener("DOMContentLoaded", () => {
  // ---- Back Button ----
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    const ref = document.referrer;
    if (ref && ref !== location.href) {
      window.location.href = ref;
    } else {
      window.location.href = "index.html";
    }
  });

  // ---- Leaflet Harita ----
  const map = L.map("map").setView([42.0, 25.0], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // ---- Koordinat göstergesi ----
  const coordsDisplay = document.getElementById("coords-display");
  map.on("mousemove", (e) => {
    const { lat, lng } = e.latlng;
    coordsDisplay.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
  });

  // ---- Gezilen Yerler ----
  const visitedPlaces = [
    { name: "Montenegro", coords: [42.4413, 19.2627], img: "images/montenegro.jpg", date: "June 2024" },
    { name: "Thailand", coords: [13.7563, 100.5018], img: "images/thailand.jpg", date: "December 2023" },
    { name: "Bulgaria", coords: [42.7339, 25.4858], img: "images/bulgaria.jpg", date: "April 2025" },
    { name: "Georgia", coords: [41.7151, 44.8271], img: "images/georgia.jpg", date: "May 2025" }
  ];

  const markerObjects = [];

  visitedPlaces.forEach(place => {
    const popupContent = `
      <div style="text-align:center;">
        <b style="font-size:1.2rem;">${place.name}</b><br>
        <img src="${place.img}" alt="${place.name}" style="width:150px; margin:5px 0; border-radius:10px;">
        <p style="margin:0; font-size:0.9rem;">Visited: ${place.date}</p>
      </div>
    `;

    const marker = L.marker(place.coords).addTo(map).bindPopup(popupContent);
    markerObjects.push(marker);

    // Marker tıklandığında animasyonlu zoom
    marker.on("click", () => {
      map.setView(place.coords, 7, { animate: true, duration: 1.2 });
    });
  });

  // Haritayı markerlara göre ortala
  const group = new L.featureGroup(markerObjects);
  map.fitBounds(group.getBounds().pad(0.3)); // biraz boşluk bırak

});
