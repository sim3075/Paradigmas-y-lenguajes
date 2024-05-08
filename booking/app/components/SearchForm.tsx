"use client";
import * as z from "zod";
import React from "react";
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

export const formSchema = z.object({
  location: z
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
  rooms: z.string().min(1, {
    message: "Por favor selecciona al menos 1 habitación",
  }),
});

function SearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dates: {
        from: new Date(),
        to: new Date(),
      },
      adults: "1",
      children: "0",
      rooms: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const checkin_monthday = values.dates.from.getDate().toString();
    const checkin_month = (values.dates.from.getMonth() + 1).toString();
    const checkin_year = values.dates.from.getFullYear().toString();
    const checkout_monthday = values.dates.to.getDate().toString();
    const checkout_month = (values.dates.to.getMonth() + 1).toString();
    const checkout_year = values.dates.to.getFullYear().toString();

    const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
    const checkout = `${checkout_year}-${checkout_month}-${checkout_monthday}`;

    const url = new URL("https://www.booking.com/searchresults.html");
    url.searchParams.set("ss", values.location);
    url.searchParams.set("group_adults", values.adults);
    url.searchParams.set("group_children", values.children);
    url.searchParams.set("no_rooms", values.rooms);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);

    router.push(`/search?url=${url.href}`);
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
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Ubicación
                  <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>

                <FormControl>
                  <Input placeholder="Cancún, México" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        {/* El siguiente elemento del componente no fue hecho por mi*/}
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
          >
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Habitaciones</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="rooms" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
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
