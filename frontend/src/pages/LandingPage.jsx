// src/pages/LandingPage.jsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800 w-full">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 md:px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Book Your Haircut Without Waiting</h1>
        <p className="text-lg md:text-xl mb-6">Choose your time slot, skip the queue, and look your best.</p>
        <Button className="text-lg px-6 py-3" onClick={() => navigate("/login")}>
          Get Started
        </Button>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-20 text-center">
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

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600 border-t">
        Made with ❤️ by Bhupinder
      </footer>
    </div>
  )
}
