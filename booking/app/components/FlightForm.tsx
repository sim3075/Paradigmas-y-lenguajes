"use client";
import * as z from "zod";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BedDoubleIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import AirportAutocomplete from "./AirportAutocomplete";

export const formSchema = z.object({
  location: z
    .string()
    .min(2, "Ubicación invalida")
    .max(50, "Ubicación invalida"),
  destination: z
    .string()
    .min(2, "Ubicación invalida")
    .max(50, "Ubicación invalida"),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .string()
    .min(1, {
      message: "Por favor seleccione al menos 1 adulto",
    })
    .max(12, { message: "Maximo 12 adultos por viaje" }),
  children: z.string().min(0).max(12, {
    message: "Maximo 12 niños por viaje",
  }),
});

interface FlightSelection {
  location: string;
  destination: string;
}

function SearchForm({
  selectedFlight,
}: {
  selectedFlight: FlightSelection | null;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      destination: "",
      dates: {
        from: new Date(),
        to: new Date(),
      },
      adults: "1",
      children: "0",
    },
  });

  interface AirportInfo {
    location: string;
    locationIATA: string;
  }
  const handleAirportSelected = (
    info: AirportInfo,
    field: "location" | "destination"
  ) => {
    form.setValue(field, info.location);
  };

  useEffect(() => {
    if (selectedFlight) {
      form.setValue("location", selectedFlight.location); // Establecer el valor de Origen
      form.setValue("destination", selectedFlight.destination); // Establecer el valor de Destino

      const button = document.getElementById("date");
      if (button) {
        button.click();
      }
    }
  }, [form, selectedFlight]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkin_monthday = "0" + values.dates.from.getDate().toString();
    const checkin_month = "0" + (values.dates.from.getMonth() + 1).toString();
    const checkin_year = values.dates.from.getFullYear().toString();
    const checkout_monthday = values.dates.to.getDate().toString();
    const checkout_month = (values.dates.to.getMonth() + 1).toString();
    const checkout_year = values.dates.to.getFullYear().toString();

    const location = values.location.split(" ")[0];
    const destination = values.destination.split(" ")[0];
    const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
    const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`;
    const passengers = `${parseInt(values.adults) + parseInt(values.children)}`;

    try {
      router.push(
        `/flight-search?origin=${location}&destination=${destination}&departureDate=${checkin}&passengers=${passengers}`
      );
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg"
      >
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5 pr-3"
          whileHover={{ scale: 1.03 }}
        >
          <AirportAutocomplete
            label="Origen"
            placeholder="Medellín, Colombia"
            onAirportSelected={(value) =>
              handleAirportSelected(value, "location")
            }
          />
        </motion.div>
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
        >
          <AirportAutocomplete
            label="Destino"
            placeholder="Cancún, México"
            onAirportSelected={(value) =>
              handleAirportSelected(value, "destination")
            }
          />
        </motion.div>
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
        >
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Fechas
                  <CalendarIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[300px] justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, "LLL dd, y")} -{" "}
                              {format(field.value?.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value?.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Selecciona tus fechas</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormMessage />*/}
              </FormItem>
            )}
          />
        </motion.div>
        <div className="flex w-full items-center space-x-2">
          <motion.div whileHover={{ scale: 1.03 }}>
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Adultos</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Adultos" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            className="grid items-center flex-3"
            whileHover={{ scale: 1.03 }}
          >
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Niños</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Children" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="grid items-center flex-1"
            whileHover={{ scale: 1.03 }}
          ></motion.div>
          <motion.div className="mt-auto" whileHover={{ scale: 1.05 }}>
            <Button type="submit" className="bg-blue-500 text-base">
              Buscar
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
export default SearchForm;
