import { FlightModel } from "../models/flight";


export async function checkFlightExists(
    origin: string,
    destination: string,
    departureDate: string
  ): Promise<boolean> {
    try {
      const existingFlight = await FlightModel.findOne({
        origin,
        destination,
        departure_date: departureDate,
      });
      return !! existingFlight; // true si existe, false si no
    } catch (error) {
      console.error("Error al verificar el vuelo:", error);
      return false;
    }
  }