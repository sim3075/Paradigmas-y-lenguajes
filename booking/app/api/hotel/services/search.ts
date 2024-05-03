import { IHotel } from "../models/IHotel";
import { mergeSort } from "@/app/libs/sort";


type sortParameters = "rate" | "rate_desc"

export class Search {

    static async filter(queryParams: URLSearchParams) {
        const query = []

        if (!!queryParams.get("q")) {

            const orConditions = ["location.country", "location.state", "location.city", "location.neighborhood", "location.address", "name"]
                .map(query => ({ [query]: { "$regex": '^' + queryParams.get('q') + '$', $options: "i" } }));

            query.push({ $or: orConditions });
        }

        if (queryParams.getAll("f").length !== 0) {

            query.push({
                "features": {
                    $elemMatch: {
                        $regex: queryParams.get('f'),
                        $options: "i"
                    }
                }
            })
        }
        if (!!queryParams.get("minStars") && !isNaN(parseInt(queryParams.get("minStars")))) {

            query.push({
                "stars": {
                    $gte: queryParams.get("minStars")
                }
            })
        }

        if (!!queryParams.get("minRating") && !isNaN(parseFloat(queryParams.get("minRating")))) {
            const rating = parseFloat(queryParams.get("minRating"))

            query.push({
                $gte: [
                    { $divide: ["$rating.total", "$rating.votes"] },
                    rating
                ]
            })
        }

        if (!!queryParams.get("g") && !isNaN(parseFloat(queryParams.get("g")))) {
            const guests = parseFloat(queryParams.get("g"))

            query.push({
                "rooms.guestCapacity": { $gte: guests }
            })
        }

        return query
    }


    static sort(hotels: IHotel[], parameter: sortParameters) {
        let sortedData: IHotel[]
        if (parameter === "rate") {
            // Ordenar por calificación ascendente
            sortedData = mergeSort(hotels, (a: IHotel, b: IHotel) => (a.rating.total / a.rating.votes) - (b.rating.total / b.rating.votes));
        } else {
            // Ordenar por calificación descendente
            sortedData = mergeSort(hotels, (a: IHotel, b: IHotel) => (b.rating.total / b.rating.votes) - (a.rating.total / a.rating.votes));
        }

        return sortedData
    }
}