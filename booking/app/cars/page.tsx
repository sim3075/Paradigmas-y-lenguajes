import { connectDb } from "@/app/libs/db/mongodb";
import { CarModel } from "../api/cars/models/car";
import CarCard from "./CarCard";
async function loadCars() {
    try {
        const cars = await CarModel.find();
        return cars;
    } catch (error) {
        console.error("Error loading cars:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

export default async function Cars() {
    try {
        const cars = await loadCars();
        return (
            <div className="grid grid-cols-5 gap-2">
                {cars.map((car) => (
                    <CarCard car={car} key={car._id} />
                ))}
            </div>
        )
    } catch (error) {
        return <div>Error loading cars. Please try again.</div>;
    };
}
