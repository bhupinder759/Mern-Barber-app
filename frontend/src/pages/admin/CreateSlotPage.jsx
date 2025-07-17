"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const slotSchema = z.object({
  service: z.string().min(1, "Service is required"),
  date: z.date(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  maxBookings: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).max(100),
});

export default function CreateSlot() {
  const [services, setServices] = useState([]);
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

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      };
      await axios.post("/api/slots", payload);
      toast.success("Slot created successfully");
    } catch (err) {
      toast.error("Failed to create slot");
      console.error("Error creating slot:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Create Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <Label>Service</Label>
          <Select {...register("service")} onValueChange={(val) => setValue("service", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service._id} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
        </div>

        <div>
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={watch("date")}
            onSelect={(val) => setValue("date", val)}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Time</Label>
            <Input type="time" {...register("startTime")} />
          </div>
          <div>
            <Label>End Time</Label>
            <Input type="time" {...register("endTime")} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Max Bookings</Label>
            <Input type="number" {...register("maxBookings")} />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" {...register("price")} />
          </div>
          <div>
            <Label>Discount (%)</Label>
            <Input type="number" {...register("discount")} />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Slot"}
        </Button>
      </form>
    </Card>
  );
}
