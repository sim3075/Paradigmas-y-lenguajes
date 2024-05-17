//conectar api 

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_clientId,
  clientSecret: process.env.AMADEUS_clientSecret
});

// nuevo vuelo a buscar 
export function new_flight(origin:String, destination:String,departure: String) {
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode:destination,
        departureDate: departure,
        adults: "1"
    })
    .then(function(response) {
        var data = response.data[0];
        var available_seats = parseInt(data.numberOfBookableSeats);
        var price = parseFloat(data.price.total);
        console.log(new_flight_data(origin,destination,departure,available_seats,price))
        return new_flight_data(origin,destination,departure,available_seats,price)
        
    })
    .catch(function(error) {
        console.error(error);
    });
}



function new_flight_data(origin_:String, destination_:String,departure_: String,available_seats_:number,price_:number){

    const data = {
    origin: origin_ ,
    destination: destination_,
    departure_date: departure_,
    available_seats:available_seats_,
    price: price_,
    }

    return JSON.stringify(data)
}
