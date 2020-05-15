import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyB8gwpYo2tO2isLPlSxOp-_aaNgxwrQsYw';

// declare var google: any;

type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
};

function onSearch(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    // Send to Google's API
    // fetch('');
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            enteredAddress
        )}&key=${GOOGLE_API_KEY}`
    ).then(response => {
        // console.log(response);
        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch location');
        }
        // Sets Coordinates
        const coordinates = response.data.results[0].geometry.location; 
        // Renders Map  
        const map = new google.maps.Map(document.getElementById("map")!, {
            center: coordinates,
            zoom: 16
        });
        // Renders Marker
        new google.maps.Marker({position: coordinates, map: map});
    }).catch(err => {
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', onSearch);