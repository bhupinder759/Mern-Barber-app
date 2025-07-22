import { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BarberProfile() {
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !shopName || !image) return alert('Fill all fields');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('shopName', shopName);
    formData.append('image', image);

    try {
      const res = await axiosInstance.post('/api/barber/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile Updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Shop Name</Label>
        <Input value={shopName} onChange={(e) => setShopName(e.target.value)} />
      </div>

      <div>
        <Label>Shop Image</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <Button type="submit">Save Profile</Button>
    </form>
  );
}
