import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "@/store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";
import sizzer from '@/assets/sizzer.png'

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoadingState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoadingState(true);
      const res = await axiosInstance.post(`/api/auth/login`, form);

      dispatch(
        setUser({
          user: res.data.user,
        //   token: null,
          role: res.data.user.role,
        })
      );

      toast.success("Login successful");

      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        // navigate("/book-slots");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#b4b1fd] px-4">
      <div className="md:w-300 md:h-130 h-auto w-auto flex flex-col items-center shadow-lg md:flex-row md:shadow-none">
        <div className="bg-none w-auto h-auto md:w-[35%] md:h-full md:flex md:flex-col md:items-center md:bg-[#7a78cf]">
          <div className=""><img src={sizzer} /></div>
          <h2 className="text-3xl font-semibold text-white text-center mb-4">Book Your Haircut</h2>
          <p className="text-lg text-white text-center">Login to book your haircut</p>
        </div>
        <div className="w-[65%] h-full bg-[#e4e5ed]"></div>
      </div>
      {/* <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to your account</h2>

        <form onSubmit={handleLogin} className="space-y-5">
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div> */}
    </div>
  );
};

export default LoginPage;
