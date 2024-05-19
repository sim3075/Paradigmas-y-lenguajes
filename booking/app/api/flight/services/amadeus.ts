//conectar api

var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_clientId,
  clientSecret: process.env.AMADEUS_clientSecret,
});

// nuevo vuelo a buscar
export function new_flight(
  origin: String,
  destination: String,
  departure: String,
  persons: String
) {
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departure,
      adults: persons,
    })
    .then(function (response: any) {
      console.log(response.data);
    })
    .catch(function (error: any) {
      console.error(error);
    });
}
