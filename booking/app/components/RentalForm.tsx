import * as z from "zod";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ClockIcon } from "lucide-react";
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
  location: z.string(),
  pickupDate: z.date(),
  returnDate: z.date(),
  brand: z.string(),
});

function RentalForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      pickupDate: new Date(),
      returnDate: new Date(),
      brand: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const location = values.location;
    const pickupDate = format(values.pickupDate, "yyyy-MM-dd");
    const returnDate = format(values.returnDate, "yyyy-MM-dd");
    const brand = values.brand;

    console.log(location, pickupDate, returnDate, brand);
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
                <FormLabel className="text-white flex">Ubicación</FormLabel>

                <FormControl>
                  <Input placeholder="Cancún, México" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
        >
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Fecha de recogida
                  <CalendarIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="pickup-date"
                        name="pickupDate"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[200px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(field.value, "LLL dd, yyyy")
                        ) : (
                          <span>Selecciona la fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      defaultMonth={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
        >
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Fecha de entrega
                  <CalendarIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="return-date"
                        name="returnDate"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[200px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(field.value, "LLL dd, yyyy")
                        ) : (
                          <span>Selecciona la fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      defaultMonth={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div
          className="grid w-full lg:max-w-sm items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
        ></motion.div>
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">Marca</FormLabel>

                <FormControl>
                  <Input placeholder="Ferrari" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <motion.div
          className="mt-auto lg:self-end"
          whileHover={{ scale: 1.05 }}
        >
          <Button type="submit" className="bg-blue-500 text-base">
            Buscar
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}

export default RentalForm;
