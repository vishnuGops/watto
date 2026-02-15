"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "@/components/LightRays";

type Category = "advertisers" | "partners";

const faqData: Record<Category, Array<{ question: string; answer: string }>> = {
  advertisers: [
    {
      question: "How do I advertise?",
      answer:
        "Simply fill out the contact form below, and our team will reach out to discuss the optimal advertising package for your brand.",
    },
    {
      question: "How does Watto compare to other advertising mediums?",
      answer:
        "Unlike digital ads that are easily ignored, Watto ensures high visibility and engagement. Each bottle stays with a consumer for extended periods, maximizing brand recall.",
    },
    {
      question: "Where are Watto bottles distributed?",
      answer:
        "Our bottles are distributed in corporate offices, gyms, retail stores, co-working spaces, educational institutions, airports, cafes, and public events. You can select target locations to align with your audience.",
    },
    {
      question: "How much does it cost to advertise?",
      answer:
        "Pricing varies based on ad placement size, distribution volume, and targeted locations. Please contact us for a customized quote tailored to your campaign goals.",
    },
    {
      question: "Can I customize the design of my ad on the bottle?",
      answer:
        "Absolutely. Brands can fully customize their ad space with logos, messaging, QR codes, or unique visuals to create a powerful impact.",
    },
    {
      question: "Can I track how well my advertisement is performing?",
      answer:
        "Yes. We offer insights into distribution metrics and location-based reach. Additionally, incorporating QR codes or unique URLs allows you to track direct engagement and impressions.",
    },
    {
      question: "What is the minimum number of bottles I need to advertise on?",
      answer:
        "Our minimum order starts at 50,000 bottles, though we offer tailored plans for various campaign sizes. Bulk discounts are available for larger orders.",
    },
    {
      question: "Can my ad include a discount code or promotional offer?",
      answer:
        "Yes. You can include QR codes, promo codes, or URLs to direct consumers to special offers, driving engagement and conversions.",
    },
    {
      question:
        "How do I ensure my ad is aligned with Watto’s branding guidelines?",
      answer:
        "Our team provides detailed design specifications and creative guidelines to ensure your ad integrates seamlessly with the bottle while maintaining your brand's identity.",
    },
    {
      question: "Can I get samples before launching a large campaign?",
      answer:
        "Yes. We provide physical mock-ups for your approval before mass production begins, ensuring your ad appears exactly as envisioned.",
    },
    {
      question:
        "What happens if I want to change my ad during an ongoing campaign?",
      answer:
        "Ad creatives can be updated for future production batches. However, once a batch is printed and distributed, changes cannot be applied to that specific inventory.",
    },
    {
      question: "What is the shelf life of Watto bottles?",
      answer: "Watto bottles have a shelf life of 6 months.",
    },
    {
      question: "How long does it take to place an advertising order?",
      answer:
        "Typically, it takes 2–3 weeks to launch a hyper-local advertising campaign from order to distribution.",
    },
    {
      question: "Can I run seasonal or limited-time ad campaigns?",
      answer:
        "Yes. We support seasonal and event-based advertising, perfect for festivals, product launches, or limited-time promotional offers.",
    },
  ],
  partners: [
    {
      question: "How do I become a partner?",
      answer:
        "Simply complete the partnership form, and our team will contact you to discuss your volume requirements, delivery schedules, and branding options.",
    },
    {
      question: "How much will it cost my business to get Watto bottles?",
      answer:
        "Watto bottles are subsidized through advertising. Partners often receive bottles at a significantly reduced cost, depending on distribution volume and advertiser participation.",
    },
    {
      question: "What sizes of bottles are available?",
      answer:
        "We currently offer 500ml and 1L formats. We will assist you in selecting the optimal size and design for your business needs.",
    },
    {
      question: "Will the bottles carry my branding?",
      answer:
        "Yes! Each bottle features your logo and branding on half of the label, ensuring your customers associate the premium water experience directly with your business.",
    },
    {
      question:
        "Do we have control over which advertisements appear on our bottles?",
      answer:
        "Yes, you retain final approval. We ensure all advertisers are non-competitive and align with your brand’s image and values. We will never place an ad on your bottles that you are not comfortable with.",
    },
    {
      question: "What kind of quality can I expect?",
      answer:
        "All Watto bottles contain purified drinking water packaged under strict safety and hygiene standards, and are fully FSSAI licensed.",
    },
    {
      question: "How does delivery and restocking work?",
      answer:
        "We collaborate with you to establish an initial order volume and a recurring delivery schedule based on your consumption rates. Our logistics team ensures a consistent supply so you never run out.",
    },
    {
      question: "Do I need to manage the logistics?",
      answer:
        "No. Watto manages end-to-end production and delivery. As a partner, your role is simply to distribute the bottles at your business location.",
    },
    {
      question: "Do I need to sign a long-term contract?",
      answer:
        "No. We offer flexible agreements tailored to your needs, ranging from short-term event partnerships to long-term supply arrangements.",
    },
    {
      question: "Will my customers be distracted by the ads?",
      answer:
        "Not at all. The label design ensures your branding remains prominent, while ads are integrated to complement the design without overshadowing your presence.",
    },
    {
      question: "How do I track my partnership benefits?",
      answer:
        "We provide detailed reports on the number of bottles supplied, cost savings achieved, and advertiser support, allowing you to clearly see the value Watto delivers.",
    },
    {
      question: "Is this eco-friendly?",
      answer:
        "Yes. Our bottles are made from 100% recyclable plastic, and we are actively exploring sustainable packaging innovations to further reduce our environmental impact.",
    },
    {
      question: "How soon can I start as a partner?",
      answer:
        "Once the agreement is signed, the onboarding process typically takes 1–2 weeks, after which bottle distribution can begin.",
    },
  ],
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("advertisers");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const currentFaqs = faqData[activeCategory];

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={2}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="opacity-90"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-normal mb-12 mt-24 text-center">
          Frequently Asked Questions
        </h1>

        {/* Category Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 p-1 rounded-full flex relative">
            {/* Animated Background for Active Tab */}
            <motion.div
              className="absolute bg-white/10 rounded-full h-[calc(100%-8px)] top-1"
              initial={false}
              animate={{
                x: activeCategory === "advertisers" ? 0 : "100%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => {
                setActiveCategory("advertisers");
                setActiveIndex(null);
              }}
              className={`relative z-10 px-8 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 ${
                activeCategory === "advertisers"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Advertisers
            </button>
            <button
              onClick={() => {
                setActiveCategory("partners");
                setActiveIndex(null);
              }}
              className={`relative z-10 px-8 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 ${
                activeCategory === "partners"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Partners
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentFaqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center py-4 text-left text-xl font-medium focus:outline-none hover:text-gray-300 transition-colors"
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    {faq.question}
                    <span className="ml-4 text-2xl font-normal text-gray-500">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 pb-4 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
