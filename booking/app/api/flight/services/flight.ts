import { FlightModel } from "../models/flight";
import { IFlight } from "../models/IFlight";

export class flightService {
  static async create(flight: IFlight) {
    const temp = new FlightModel(flight);
    return await temp.save();
  }

  static async get(filter: any) {
    return await FlightModel.find(filter);
  }

  static async getById(id: string) {
    console.log(id);

    const flight = await FlightModel.findById(id);
    return flight;
  }

  static async delete(FlightId: string) {
    return await FlightModel.findOneAndDelete({ _id: FlightId });
  }

  static async patch(flightId: string, updatedData: IFlight) {
    try {
      console.log(updatedData);

      return await FlightModel.findOneAndUpdate(
        { _id: flightId },
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async filter(queryParams: URLSearchParams) {
    const origin = queryParams.get("origin");
    const destination = queryParams.get("destination");
    const departure_date = queryParams.get("departureDate");
    const passengers = queryParams.get("passengers");
    return await FlightModel.find({
      origin: origin,
      destination: destination,
      departure_date: departure_date,
    });
  }
}
