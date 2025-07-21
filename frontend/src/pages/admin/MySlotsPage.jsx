"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export default function MySlots() {
  const [slots, setSlots] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState({ date: "", startTime: "", endTime: "", price: "", discount: "", maxBookings: "", service: "" });

  // Fetch all slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axiosInstance.get("/api/slots/my-slots");
        setSlots(res.data);
      } catch (err) {
        console.log("Error fetching slots:", err);
        toast("Failed to fetch slots");
      }
    };

    fetchSlots();
  }, []);
  

  const handleEditClick = (slot) => {
    setEditingSlot(slot);
    setForm({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      price: slot.price,
      discount: slot.discount,
      maxBookings: slot.maxBookings,
      service: slot.service,
    });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateSlot = async () => {
    console.log(editingSlot._id)
    try {
      const res = await axiosInstance.put(`/api/slots/${editingSlot._id}`, form);

      toast("Update Successfully")
      window.location.reload();
    } catch (err) {
      console.log("Error updating slot:", err);
      toast.error("Failed to update slot");
      toast("Error updating slot");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;
    try {
      await axios.delete(`/api/delete-slot/${id}`, { withCredentials: true });
      setSlots((prev) => prev.filter((slot) => slot._id !== id));
    } catch (err) {
      alert("Error deleting slot");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Slots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <Card key={slot._id}>
            <CardContent className="p-4 space-y-2">
              <p><strong>Date:</strong> {slot.date}</p>
              <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
              <p><strong>Service:</strong> {slot.service}</p>
              <p><strong>Price:</strong> ₹{slot.price}</p>
              <p><strong>Status:</strong> {slot.isBooked ? "Booked" : "Available"}</p>

              <div className="flex gap-2 mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleEditClick(slot)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" name="date" value={form.date} onChange={handleInputChange} />
                      <Label>Start Time</Label>
                      <Input type="time" name="startTime" value={form.startTime} onChange={handleInputChange} />
                      <Label>End Time</Label>
                      <Input type="time" name="endTime" value={form.endTime} onChange={handleInputChange} />
                      <Label>Price</Label>
                      <Input type="number" name="price" value={form.price} onChange={handleInputChange} />
                      <Label>Discount</Label>
                      <Input type="number" name="discount" value={form.discount} onChange={handleInputChange} />
                      <Label>Max Bookings</Label>
                      <Input type="number" name="maxBookings" value={form.maxBookings} onChange={handleInputChange} />
                      <Label>Service</Label>
                      <select name="service" value={form.service} onChange={handleInputChange} className="border rounded p-2 w-full">
                        <option value="">Select</option>
                        <option value="haircut">Haircut</option>
                        <option value="beared cut">Beared Cut</option>
                        <option value="both">Both</option>
                        <option value="facial">Facial</option>
                        <option value="shave">Shave</option>
                      </select>
                      <Button className="mt-2 w-full" onClick={handleUpdateSlot}>Update Slot</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDelete(slot._id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
