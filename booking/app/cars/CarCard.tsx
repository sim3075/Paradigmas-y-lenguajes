import Image from 'next/image'
import Link from 'next/link'

export default function CarCard({ car }: any){
    return(
        <Link href={`./cars/deal/${car.id}`}>
            <div className="bg-slate-400 p-10 text-white rounded-mv hover:bg-slate-500">
                <Image 
                    src={car.photo}
                    width={200}
                    height={200}
                    alt={car.brand}
                    priority={true}  
                />
                <h2 className='font-bold'>{car.brand}</h2>
                <p>{car.description}</p>
                <p><b>Location:</b> {car.city}</p>
            </div>
        </Link>
    )
}
