"use client";
import { useRouter } from "next/navigation";

export default function Deal({ params }: any) {
    const router = useRouter();
    async function createDeal() {
        // Logic to create deal (booking)
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
