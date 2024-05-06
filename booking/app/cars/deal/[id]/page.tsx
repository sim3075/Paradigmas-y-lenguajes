"use client";
import { useRouter } from "next/navigation";

export default function Deal({ params }: any) {
    const router = useRouter();
    async function createDeal() {
        try {
            if (window.confirm("Are you sure you want to book the car?")) {
                let dealCar = null;
                await fetch(`${window.location.origin}/api/cars/${params.id}`)
                    .then((response) => response.json())
                    .then((car) => {
                        dealCar = car
                    });
                if (dealCar !== null) {
                    console.log("Deal car stringify:", JSON.stringify(dealCar));
                    console.log(params.id)
                    const response = await fetch(
                        `${window.location.origin}/api/cars/deal`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                user: {
                                    name: "User Name",
                                    contact: {
                                        prefix: 57,
                                        phone: 3013743983,
                                        email: "example@gmail.com",
                                    },
                                },
                                pickUpDate: "2024-05-31",
                                dropOffDate: "2024-06-03",
                                car: dealCar,
                                price: 400,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.status === 200) {
                        console.log(
                            "response json: " + (await response.json())
                        );
                        router.push("/cars");
                        // router.refresh()
                    }
                } else {
                    throw new Error("Couldn´t make deal");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="block">
            Deal´s view. Car id: {params.id}
            <div>
                <button
                    type="button"
                    className="bg-green-600 px-3 py-1 rounded-md"
                    onClick={createDeal}
                >
                    Continue to book
                </button>
            </div>
        </div>
    );
}
