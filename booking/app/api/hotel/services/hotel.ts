import { HotelModel } from "../models/hotel";
import { IHotel } from "../models/IHotel";
import { mergeSort } from "./sort";
import { moneyExchange } from "./moneyExchange";

export class HotelService {

    static async create(hotel: IHotel) {
        const temp = new HotelModel(hotel)
        return await temp.save()

    }

    static async get(filter: any) {
        return await HotelModel.find(filter)
    }

    static async getById(id:string) {
        console.log(id);
        
        const hotel = await HotelModel.findById(id)
        return hotel
    }

    static async delete(hotelId: string) {
        return await HotelModel.findOneAndDelete({ _id: hotelId })
    }
    
    static async patch(hotelId: string, updatedData: IHotel) {
        try{
            console.log(updatedData);
         
            return await HotelModel.findOneAndUpdate({ _id: hotelId }, updatedData, {
                new: true,
                runValidators: true
            })
        }catch (error){
            console.log(error);
            
        }
    }

    static filter(queryParams: URLSearchParams) {
        const query: any = {}

        if (!!queryParams.get("q")) {
            query.$and ? null : query.$and = [];

            const orConditions = ["location.country", "location.state", "location.city", "location.neighborhood", "location.address", "name"]
                .map(plac => ({ [plac]: { "$eq": queryParams.get("q") } }));

            query.$and.push({ $or: orConditions });
        }

        if (queryParams.getAll("f").length !== 0) {
            query.$and ? null : query.$and = [];

            query.$and.push({ "features": { "$in": queryParams.get("f") } })
        }
        if (!!queryParams.get("minStars") && !isNaN(parseInt(queryParams.get("minStars")))) {
            query.$and ? null : query.$and = [];
            query.$and.push({ "stars": { $gte: queryParams.get("minStars") } })
        }

        if (!!queryParams.get("minRating") && !isNaN(parseFloat(queryParams.get("minRating")))) {
            const rating = parseFloat(queryParams.get("minRating"))

            query.$and ? null : query.$and = [];

            query.$and.push({
                $expr: {
                    $gte: [
                        { $divide: ["$rating.total", "$rating.votes"] },
                        rating
                    ]
                }
            })
        }
        if ((!isNaN(parseFloat(queryParams.get("minPrice")))) || (!isNaN(parseFloat(queryParams.get("maxPrice")))) && !!queryParams.get("currency")) {
            //Hallar los hoteles que sea mayor a min, por defecto 0 y menor a max si se pone
            //mirar el valor del hotel y saber si es menor al solicitado

            const change = moneyExchange(queryParams.get("currency"), "USD")
            const convertedMaxPrice = !!queryParams.get("maxPrice") ? parseFloat(queryParams.get("maxPrice")) : Number.MAX_SAFE_INTEGER;
            const convertedMinPrice = !!queryParams.get("minPrice") ? parseFloat(queryParams.get("minPrice")) : 0;
            query.$and ? null : query.$and = [];

            query.$and.push({
                "rooms.price.amount": {
                    $gte: convertedMinPrice,
                    $lte: convertedMaxPrice
                }
            }) 
        }

        return query

    }

    static sort(hotels: any, sortParameters: string[]) {

        let sortedData = mergeSort(hotels, (a: any, b: any) => parseFloat(a.rating) - parseFloat(b.rating));
        // sortedData = mergeSort(sortedData, (a:any, b:any) => a.name.localeCompare(b.name));
        return sortedData

    }

    
}


