// car service
import { ICar } from "../models/car";
import { CarModel } from "../models/car";

export class carService {
  static async create(car: ICar) {
    const temp = new CarModel(car);
    return await temp.save();
  }

  static async get(filter: any) {
    return await CarModel.find(filter);
  }

  static async getById(id: string) {
    console.log(id);

    const car = await CarModel.findById(id);
    return car;
  }

  static async delete(carId: string) {
    return await CarModel.findOneAndDelete({ _id: carId });
  }

  static async patch(carId: string, updatedData: ICar) {
    try {
      console.log(updatedData);

      return await CarModel.findOneAndUpdate({ _id: carId }, updatedData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async filter(queryParams: URLSearchParams) {
    const origin = queryParams.get("origin");
    const brand = queryParams.get("brand");
    return await CarModel.find({
      city: origin,
      brand: brand,
    });
  }
}
