var x = document.getElementById("location");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const Location = require("./models/locations")

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  SavePosition(position);


function SavePosition(position) {
  let location = new Location();
  location.longitude = position.coords.longitude;
  location.latitude = position.coords.latitude;
  location.index = 0
  location.save((err) =>{
        if (err) {
            return res.status(500).send({error: 'database failure'});
        }
    })
}
//   fetch("http://127.0.0.1:8000/locations/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json",},
//             body: JSON.stringify({
//                   title: position.coords.latitude
//                 ,
//                 lat: position.coords.latitude,
//               long: position.coords.longitude
//             })
// })
}

getLocation()