import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import barber1 from "@/assets/long.jpg"; 
import barber2 from "@/assets/square.jpg"; // Replace with actual images

// import { Accordion, AccordionItem } from "@/components/ui/accordion"; // Example for FAQ
import { motion } from "framer-motion"; // For animations

// Dummy icons (replace with real icons or use Heroicons/Phosphor/React Icons)
const Icon = ({ children }) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4 text-2xl">
    {children}
  </div>
);

// Dummy data for features, testimonials, barbers, pricing, and FAQs
const FEATURES = [
  { icon: "💈", title: "Trusted Barbers", desc: "Handpicked, reviewed professionals." },
  { icon: "⏰", title: "Instant Booking", desc: "Book in seconds, no waiting." },
  { icon: "📍", title: "Nearby Shops", desc: "Find barbers close to you." },
  { icon: "💳", title: "Easy Payments", desc: "Pay online or in person." },
];

const TESTIMONIALS = [
  { name: "Alex", text: "Super easy to book and no waiting at all!", avatar: "🧑" },
  { name: "Priya", text: "Loved the experience and the barber was great.", avatar: "👩" },
  { name: "Sam", text: "Best way to get a haircut in town!", avatar: "🧔" },
];

const BARBERS = [
  { name: "Mike's Barbershop", location: "Downtown", img: "https://placehold.co/100x100", rating: 4.8 },
  { name: "Elite Cuts", location: "Uptown", img: "https://placehold.co/100x100", rating: 4.7 },
  { name: "Classic Styles", location: "Suburb", img: "https://placehold.co/100x100", rating: 4.9 },
  // ...fetch from backend
];

const PRICING = [
  { plan: "Basic Cut", price: "$15", features: ["Haircut", "Quick Style"] },
  { plan: "Premium", price: "$25", features: ["Haircut", "Beard Trim", "Wash"] },
  { plan: "VIP", price: "$40", features: ["All services", "Priority Booking"] },
];

const FAQS = [
  { q: "How do I book a slot?", a: "Just choose a barber, pick a time, and confirm your booking." },
  { q: "Can I cancel or reschedule?", a: "Yes, you can manage your bookings from your dashboard." },
  { q: "Are payments secure?", a: "All payments are processed securely via trusted gateways." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 w-full flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-16 px-4 md:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-start text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Book Your Haircut Without Waiting</h1>
          <p className="text-lg md:text-xl mb-6">Choose your time slot, skip the queue, and look your best.</p>
          <Button className="text-lg px-6 py-3" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
        {/* Right: Images with animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex gap-4 fade-in-up"
          >
         
          <div className="relative flex gap-4">
            <img
              src={barber1}
              alt="Barber 1"
              className="rounded-xl shadow-lg w-36 h-48 md:w-44 md:h-60 object-cover transform hover:scale-105 transition duration-300"
              style={{ animation: "fadeUp 1s ease" }}
            />
            <img
              src={barber2}
              alt="Barber 2"
              className="rounded-xl shadow-lg w-36 h-48 md:w-44 md:h-60 object-cover transform hover:scale-105 transition duration-300 mt-8"
              style={{ animation: "fadeUp 1.3s ease" }}
            />
          </div>
          </motion.div>
        </div>
      </section>
      {/* Add keyframes for fadeUp animation */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>


      {/* Features Section */}
      <section className="py-14 px-4 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <Icon>{f.icon}</Icon>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 px-4 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Choose a Barber", desc: "Browse through trusted barbershops in your area." },
            { title: "Pick a Slot", desc: "Select a time that suits you best." },
            { title: "Show Up & Shine", desc: "No waiting. Just walk in and get styled!" }
          ].map((step, idx) => (
            <Card key={idx} className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-14 px-4 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        {/* Replace with a real slider/carousel (e.g., Swiper/React Slick) */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="min-w-[280px] bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="text-4xl mb-2">{t.avatar}</div>
              <p className="italic mb-2">"{t.text}"</p>
              <span className="font-semibold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Available Barbers/Shops Carousel */}
      <section className="py-14 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Available Barbershops</h2>
        {/* TODO: Replace with dynamic fetch from backend */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {BARBERS.map((b, i) => (
            <div key={i} className="min-w-[220px] bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <img src={b.img} alt={b.name} className="w-20 h-20 rounded-full mb-3 object-cover" />
              <h3 className="text-lg font-semibold">{b.name}</h3>
              <p className="text-sm text-gray-500">{b.location}</p>
              <span className="mt-2 text-yellow-500 font-bold">{b.rating} ★</span>
              <Button className="mt-4 w-full" onClick={() => navigate("/login")}>Book Now</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans / Service Highlights */}
      <section className="py-14 px-4 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Our Pricing</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <Card key={i} className="shadow-md">
              <CardContent className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2">{p.plan}</h3>
                <div className="text-3xl font-bold mb-4">{p.price}</div>
                <ul className="mb-4 text-gray-600">
                  {p.features.map((f, j) => (
                    <li key={j}>• {f}</li>
                  ))}
                </ul>
                <Button onClick={() => navigate("/login")}>Choose</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-14 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        {/* Replace with Accordion from ShadCN or Headless UI */}
        <div className="max-w-2xl mx-auto">
          {FAQS.map((faq, i) => (
            <div key={i} className="mb-4 border-b">
              <button className="w-full text-left py-3 font-semibold focus:outline-none">
                {faq.q}
              </button>
              <div className="pl-2 pb-3 text-gray-600">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="py-10 px-4 md:px-20 bg-indigo-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to look your best?</h2>
        <Button className="text-lg px-8 py-3" onClick={() => navigate("/register")}>
          Register or Book Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-20 bg-gray-900 text-gray-300">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">BarberBook</h3>
            <p className="text-sm">Book your next haircut in seconds.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/register" className="hover:underline">Register</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm">support@barberbook.com</p>
            <div className="flex gap-3 mt-2">
              {/* Replace with real social icons */}
              <a href="#" className="hover:text-white">🐦</a>
              <a href="#" className="hover:text-white">📸</a>
              <a href="#" className="hover:text-white">💬</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} BarberBook. All rights reserved.
        </div>
      </footer>
    </div>
  );
}