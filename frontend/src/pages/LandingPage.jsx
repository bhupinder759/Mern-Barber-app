import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import {
  Scissors,
  Clock,
  MapPin,
  CreditCard,
  Star,
  Quote,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

// ASSETS (assuming you have these images)
import barber1 from "@/assets/long.jpg";
import barber2 from "@/assets/square.jpg";

// --- DUMMY DATA (No Changes) ---
const FEATURES = [
  { icon: <Scissors />, title: "Trusted Barbers", desc: "Handpicked, reviewed professionals." },
  { icon: <Clock />, title: "Instant Booking", desc: "Book in seconds, no waiting." },
  { icon: <MapPin />, title: "Nearby Shops", desc: "Find top-rated barbers close to you." },
  { icon: <CreditCard />, title: "Easy Payments", desc: "Pay securely online or in person." },
];
const TESTIMONIALS = [
  { name: "Alex Johnson", text: "The easiest booking experience I've ever had. Found a great barber in minutes!", avatar: "https://placehold.co/100x100" },
  { name: "Priya Sharma", text: "Absolutely seamless. The app is beautiful and the no-wait promise is real. Highly recommend!", avatar: "https://placehold.co/100x100" },
  { name: "Sam Lee", text: "This has completely changed how I get my haircuts. The quality of barbers is top-notch.", avatar: "https://placehold.co/100x100" },
  { name: "Maria Garcia", text: "A must-have app for anyone who values their time and style. Five stars!", avatar: "https://placehold.co/100x100" },
];
const BARBERS = [
  { name: "Mike's Barbershop", location: "Downtown", img: "https://placehold.co/300x300", rating: 4.8 },
  { name: "Elite Cuts", location: "Uptown", img: "https://placehold.co/300x300", rating: 4.7 },
  { name: "Classic Styles", location: "Suburb", img: "https://placehold.co/300x300", rating: 4.9 },
  { name: "The Gentleman's Chair", location: "Financial District", img: "https://placehold.co/300x300", rating: 4.9 },
];
const PRICING = [
  { plan: "Classic Cut", price: "$25", features: ["Expert Haircut", "Quick Style", "Hot Towel"], popular: false },
  { plan: "Premium", price: "$45", features: ["Everything in Classic", "Beard Trim & Shape-up", "Shampoo & Wash"], popular: true },
  { plan: "VIP Experience", price: "$60", features: ["Everything in Premium", "Priority Booking", "Complimentary Drink"], popular: false },
];
const FAQS = [
  { q: "How do I book an appointment?", a: "Simply browse for a barber, select a service and time slot that works for you, and confirm your booking. It's that easy!" },
  { q: "Can I cancel or reschedule my booking?", a: "Yes, you can easily manage your appointments directly from your user dashboard up to 2 hours before the scheduled time." },
  { q: "Are the online payments secure?", a: "Absolutely. We use Stripe, a leading payment processor, to ensure all your transactions are encrypted and 100% secure." },
  { q: "How are barbers selected for the platform?", a: "We have a rigorous vetting process. Each barber is reviewed for their skill, experience, hygiene standards, and customer feedback before joining." },
];

// --- ANIMATION VARIANTS ---
const fadeIn = (direction = "up", delay = 0) => ({
  initial: { opacity: 0, y: direction === "up" ? 20 : -20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
  viewport: { once: true, amount: 0.3 },
});

export default function EnhancedLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen absolute top-0 bg-[#0a0a0a] text-gray-200 w-full flex flex-col overflow-x-hidden">
      {/* ======================= */}
      {/* HERO SECTION       */}
      {/* ======================= */}
      <section className="relative flex flex-col md:flex-row items-center justify-between mt-20 py-24 md:py-32 px-6 md:px-16">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Style On-Demand. <br />
            <span className="text-blue-400">No More Waiting.</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-lg">
            Find elite barbers, book your perfect time slot instantly, and walk in like a VIP. Your next great haircut is just a click away.
          </p>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-8 py-6 transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Find Your Barber
          </Button>
        </motion.div>
        {/* Right: Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-10"
        >
          <div className="relative flex gap-4">
            <motion.img
              initial={{ y: 40, rotate: -5 }}
              animate={{ y: 0, rotate: -8 }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              src={barber1}
              alt="Barber giving a haircut"
              className="rounded-xl shadow-2xl shadow-blue-500/10 w-44 h-60 md:w-52 md:h-72 object-cover border-2 border-gray-700"
            />
            <motion.img
              initial={{ y: -20, rotate: 5 }}
              animate={{ y: 0, rotate: 8 }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.3 }}
              src={barber2}
              alt="Stylish haircut"
              className="rounded-xl shadow-2xl shadow-blue-500/10 w-44 h-60 md:w-52 md:h-72 object-cover mt-8 border-2 border-gray-700"
            />
          </div>
        </motion.div>
      </section>

      {/* ======================= */}
      {/* FEATURES SECTION     */}
      {/* ======================= */}
      <section className="py-20 px-6 md:px-16 bg-[#111111]">
        <motion.h2 {...fadeIn()} className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why You'll Love It
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeIn("up", i * 0.1)}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-900/50 hover:bg-gray-800/60 transition-colors duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= */}
      {/* TESTIMONIALS SECTION   */}
      {/* ======================= */}
      <section className="py-20 px-6 md:px-16">
        <motion.h2 {...fadeIn()} className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Thousands
        </motion.h2>
        <motion.div {...fadeIn()}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
          >
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-gray-900/50 border-gray-800 h-full flex flex-col">
                      <CardContent className="p-6 flex flex-col items-start justify-between flex-grow">
                        <Quote className="w-8 h-8 text-blue-400 mb-4" />
                        <p className="text-gray-300 mb-6 flex-grow">"{t.text}"</p>
                        <div className="flex items-center">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                          <div>
                            <p className="font-semibold">{t.name}</p>
                            <p className="text-sm text-gray-500">Verified Customer</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-gray-800 hover:bg-gray-700 hover:text-white" />
            <CarouselNext className="text-white bg-gray-800 hover:bg-gray-700 hover:text-white" />
          </Carousel>
        </motion.div>
      </section>

      {/* ======================= */}
      {/* PRICING SECTION      */}
      {/* ======================= */}
      <section className="py-20 px-6 md:px-16 bg-[#111111]">
        <motion.h2 {...fadeIn()} className="text-3xl md:text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p {...fadeIn("up", 0.1)} className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Choose a plan that fits your needs. No hidden fees, ever. All plans give you access to our top-rated barbers.
        </motion.p>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {PRICING.map((p, i) => (
            <motion.div {...fadeIn("up", i * 0.15)} key={i}>
              <Card
                className={`h-full flex flex-col p-2 rounded-xl transition-all duration-300 ${p.popular
                  ? "bg-gradient-to-br from-blue-900/50 to-gray-900 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                  }`}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-2xl text-green-400 font-bold">{p.plan}</span>
                    {p.popular && <span className="text-xs font-semibold bg-blue-500 text-white px-3 py-1 rounded-full">POPULAR</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="text-4xl text-white font-extrabold mb-4">{p.price}</div>
                  <ul className="space-y-3 mb-8 text-gray-400 flex-grow">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full text-lg py-6 font-bold transition-transform duration-300 hover:scale-105 ${p.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    onClick={() => navigate("/login")}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================= */}
      {/* FAQ SECTION        */}
      {/* ======================= */}
      <section className="py-20 px-6 md:px-16">
        <motion.h2 {...fadeIn()} className="text-3xl md:text-4xl font-bold text-center mb-12">
          Your Questions, Answered
        </motion.h2>
        <motion.div {...fadeIn()} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-800">
                <AccordionTrigger className="py-4 text-left text-lg hover:no-underline hover:text-blue-400">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* ======================= */}
      {/* FOOTER SECTION     */}
      {/* ======================= */}
      <footer className="py-12 px-6 md:px-16 bg-[#111111] border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-1">BarberBook</h3>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Twitter /></a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Instagram /></a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Facebook /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
