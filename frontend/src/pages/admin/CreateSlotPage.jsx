"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const slotSchema = z
  .object({
    service: z.string().min(1, "Service is required"),
    date: z.date().refine((val) => val >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Date cannot be in the past",
    }),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    maxBookings: z.coerce.number().min(1, "Minimum 1 booking required"),
    price: z.coerce.number().min(0, "Price must be 0 or more"),
    discount: z.coerce.number().min(0).max(100),
  })
  .refine(
    (data) => {
      const [sh, sm] = data.startTime.split(":").map(Number);
      const [eh, em] = data.endTime.split(":").map(Number);
      const start = sh * 60 + sm;
      const end = eh * 60 + em;
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export default function CreateSlot() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      service: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      maxBookings: 1,
      price: 0,
      discount: 0,
    },
  });

  const onSubmit = async (data) => {
    console.log(data, "Submitting slot data");
    try {
      setLoading(true);
      const payload = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      };
      await axios.post("/api/slots/", payload);
      toast.success("Slot created successfully!");
    } catch (err) {
      toast.error("Failed to create slot.");
      console.error("Error creating slot:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 shadow-xl rounded-2xl border">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a New Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Service Selection */}
        <div>
          <Label>Service</Label>
          <Select
            onValueChange={(val) => setValue("service", val)}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Haircut">Haircut</SelectItem>
              <SelectItem value="Beard Cut">Beard Cut</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
              <SelectItem value="Facial">Facial</SelectItem>
              <SelectItem value="Shave">Shave</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Date Picker */}
        <div>
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={watch("date")}
            onSelect={(val) => setValue("date", val)}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="border rounded-md"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Start and End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Time</Label>
            <Input type="time" {...register("startTime")} />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div>
            <Label>End Time</Label>
            <Input type="time" {...register("endTime")} />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Max Bookings, Price, Discount */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Max Bookings</Label>
            <Input type="number" {...register("maxBookings")} />
            {errors.maxBookings && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxBookings.message}
              </p>
            )}
          </div>
          <div>
            <Label>Price (₹)</Label>
            <Input type="number" {...register("price")} />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <Label>Discount (%)</Label>
            <Input type="number" {...register("discount")} />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating Slot..." : "Create Slot"}
        </Button>
      </form>
    </Card>
  );
}
