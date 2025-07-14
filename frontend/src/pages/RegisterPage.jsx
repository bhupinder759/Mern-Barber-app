import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sizzer from "@/assets/sizzer.png";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/auth/register`,
        form
      );

      dispatch(
        setUser({
          user: res.data.user,
          token: res.data.token,
          role: res.data.user.role,
        })
      );

      toast.success("Registration successful");

      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/book-slots");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-auto justify-center min-h-screen bg-[#b4b1fd] py-25">
      <div className="md:w-300 md:h-130 h-auto w-auto flex flex-col items-center shadow-none md:flex-row lg:shadow">
        <div className="bg-none w-auto h-auto md:w-[35%] md:h-full md:flex md:flex-col md:items-center md:bg-[#7a78cf]">
          <div className="">
            <img src={sizzer} />
          </div>
          <h2 className="text-3xl font-semibold text-white text-center mb-4">
            Book Your Haircut
          </h2>
          <p className="text-lg text-white text-center">
            Register to get started
          </p>
        </div>
        <div className="w-[65%] h-full bg-[#e4e5ed] flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl shadow-indigo-400">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create your account
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Select Role</Label>
                <Select
                  onValueChange={(value) => setForm({ ...form, role: value })}
                  defaultValue={form.role}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
