import ContactFormSection from "@/components/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-black text-white flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-normal mb-8 pt-24 text-center">
          Get in Touch
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Ready to hydrate your brand? Reach out to us for rates and partnership
          opportunities.
        </p>

        <ContactFormSection />

        <div className="mt-16 text-center border-t border-white/10 pt-12">
          <p className="text-gray-500">Or email us directly at</p>
          <a
            href="mailto:hello@watto.com"
            className="text-2xl font-medium hover:text-blue-500 transition-colors"
          >
            hello@watto.com
          </a>
        </div>
      </div>
    </main>
  );
}
