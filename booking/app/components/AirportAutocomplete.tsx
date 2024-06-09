import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";

const libs: Library[] = ["places"];

interface AirportInfo {
  location: string;
  locationIATA: string;
}

interface Items {
  label: string;
  placeholder: string;
  onAirportSelected: (info: AirportInfo) => void;
}

function AirportAutocomplete({ label, placeholder, onAirportSelected }: Items) {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [airportValue, setAirportValue] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });

  const placesAutoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const gAutoComplete = new google.maps.places.Autocomplete(
        placesAutoCompleteRef.current as HTMLInputElement,
        {
          types: ["airport"],
          strictBounds: true,
        }
      );
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", async () => {
        const place = autoComplete.getPlace();
        if (place?.address_components && place.geometry?.location) {
          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();
          let cityName = "";
          let countryName = "";
          place.address_components.forEach((component) => {
            if (component.types.includes("locality")) {
              cityName = component.long_name;
            } else if (component.types.includes("country")) {
              countryName = component.long_name;
            }
          });

          // Hacer una petición a la API para obtener el código IATA
          const response = await fetch(
            `http://iatageo.com/getCode/${lat}/${lng}`
          );
          const data = await response.json();
          const iataCode = data.IATA || "";

          // Construir la cadena final
          const airportInfo = `${cityName} (${countryName}) ${iataCode}`;
          setAirportValue(airportInfo);
          onAirportSelected({ location: airportInfo, locationIATA: iataCode });
        }
      });
    }
  }, [autoComplete, onAirportSelected]);

  return (
    <div>
      <FormItem>
        <FormLabel className="text-white flex">
          {label}
          {label === "Origen" ? (
            <PlaneTakeoff className="ml-2 h-4 w-4 text-white" />
          ) : (
            <PlaneLanding className="ml-2 h-4 w-4 text-white" />
          )}
        </FormLabel>
        <FormControl>
          <Input
            ref={placesAutoCompleteRef}
            placeholder={placeholder}
            style={{ width: "300px" }}
            defaultValue={airportValue}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  );
}

export default AirportAutocomplete;
