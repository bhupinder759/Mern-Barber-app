// BarberProfile.jsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";

const BarberProfile = () => {
  // --- STATE AND LOGIC (No changes) ---
  const [shopName, setShopName] = useState("");
  const [barberName, setBarberName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSave = async () => {
    if (!shopName || !barberName || !imageFile) {
      return toast.error("Shop name, barber name, and profile image are all required.");
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("my_file", imageFile);

      const uploadRes = await axiosInstance.post("/api/admin/upload-image", formData);
      const imageUrl = uploadRes.data.result.url;

      await axiosInstance.post("/api/auth/update-profile", {
        shopName,
        barberName,
        profileImage: imageUrl,
      });

      toast.success("Profile updated successfully!");
      // Reset form
      setShopName("");
      setBarberName("");
      setImageFile(null);
      setPreviewUrl("");
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl mx-auto bg-black border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Barber Profile</CardTitle>
          <CardDescription>
            Update your shop and public profile information. This will be visible to customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <Label className="text-lg font-medium">Profile Picture</Label>
            <div className="relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-900 border-2 border-dashed border-gray-700 flex items-center justify-center">
                  <UploadCloud className="w-10 h-10 text-gray-600" />
                </div>
              )}
            </div>
            <Label htmlFor="imageUpload" className="cursor-pointer">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700">
                {previewUrl ? "Change Image" : "Upload Image"}
              </div>
              <input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
            </Label>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="shopName" className="text-white">Shop Name</Label>
              <Input
                id="shopName"
                placeholder="e.g., Elite Cuts"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                disabled={loading}
                className="bg-gray-900 border-gray-700 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="barberName" className="text-white">Your Name (Public)</Label>
              <Input
                id="barberName"
                placeholder="e.g., Alex Johnson"
                value={barberName}
                onChange={(e) => setBarberName(e.target.value)}
                disabled={loading}
                className="bg-gray-900 border-gray-700 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full md:w-auto ml-auto bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BarberProfile;