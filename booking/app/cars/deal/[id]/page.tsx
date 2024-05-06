export default function Deal({ params }: any) {
    async function createDeal() {
        // logic to create deal
    }

    return (
        <div className="block">
            <h1>Deal´s view.</h1> 
            Car id: {params.id}
            <div>
                <button
                    type="button"
                    className="bg-green-600 px-3 py-1 rounded-md"
                    onClick={createDeal}
                >
                    Book car
                </button>
            </div>
        </div>
    );
}
