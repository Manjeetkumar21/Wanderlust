console.log(mapToken);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/outdoors-v11",
  center: coordinates, // starting position [lng, lat]
  zoom: 6, // starting zoom
});

console.log(coordinates);
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .addTo(map);

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "top-right");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
    showUserLocation: true,
  })
);

map.addControl(
  new mapboxgl.FullscreenControl({ container: document.querySelector("#map") })
);


map.flyTo({
  center: coordinates,
  zoom: 9,
  curve: 4,
  duration: 5000,
  essential: true,
});
