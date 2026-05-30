import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQs() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative h-[40vh] bg-zinc-900">
        <Navbar />
        <div className="flex items-center justify-center h-full pt-20">
          <h1 className="text-6xl font-black text-white uppercase italic">FAQs</h1>
        </div>
      </div>
      <section className="flex-grow py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">What is CSuite Network?</h3>
              <p className="text-zinc-600">A network for ambitious professionals coming together to learn and solve complex problems.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">How do I join?</h3>
              <p className="text-zinc-600">You can apply for membership through our membership section on the home page.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
