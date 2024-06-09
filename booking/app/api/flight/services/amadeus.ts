var Amadeus = require("amadeus");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_clientId,
  clientSecret: process.env.AMADEUS_clientSecret,
});

// nuevo vuelo a buscar
export async function new_flight(
  origin: string,
  destination: string,
  departure: string
) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departure,
      adults: "1",
    });
    const data = response.data[0];
    const available_seats = parseInt(data.numberOfBookableSeats);
    const price = parseFloat(data.price.total);

    return new_flight_data(
      origin,
      destination,
      departure,
      available_seats,
      price
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

function new_flight_data(
  origin_: string,
  destination_: string,
  departure_: string,
  available_seats_: number,
  price_: number
) {
  return {
    origin: origin_,
    destination: destination_,
    departure_date: departure_,
    available_seats: available_seats_,
    price: price_,
  };
}
