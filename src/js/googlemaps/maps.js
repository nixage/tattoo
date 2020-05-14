// <script async defer
//     src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
// </script>
// https://developers.google.com/maps/documentation/javascript/examples/map-simple
// https://developers.google.com/maps/documentation/javascript/examples/icon-complex
// https://developers.google.com/maps/documentation/javascript/styling

let marker;
function initMap(){
  let opt = {
    center: {lat: 48.62051, lng: 22.287534},
    zoom : 5
  }
  let map = new google.maps.Map( document.getElementById('map'), opt)
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 48.62051, lng: 22.287534}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
