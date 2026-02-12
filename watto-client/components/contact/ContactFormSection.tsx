'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send } from 'lucide-react';

type FormType = 'advertise' | 'info' | 'buy' | null;

export default function ContactFormSection() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null);

  const buttons = [
    { id: 'advertise', label: 'Advertise with us' },
    { id: 'info', label: 'Get more info' },
    { id: 'buy', label: 'Buy our bottles' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Button Group */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectedForm(selectedForm === btn.id ? null : (btn.id as FormType))}
            className={`
              relative px-6 py-4 rounded-xl font-medium text-lg transition-all duration-300 w-full sm:w-auto
              border border-white/10 overflow-hidden group
              ${selectedForm === btn.id 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'bg-neutral-900/50 text-white hover:bg-neutral-800 hover:border-white/30'}
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {btn.label}
              <motion.span
                animate={{ rotate: selectedForm === btn.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Form Container */}
      <AnimatePresence mode="wait">
        {selectedForm && (
          <motion.div
            key={selectedForm}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden"
          >
            <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              {selectedForm === 'advertise' && <AdvertiseForm />}
              {selectedForm === 'info' && <InfoForm />}
              {selectedForm === 'buy' && <BuyBottlesForm />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Components
const InputField = ({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <input
      type={type}
      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, options }: { label: string; options: string[] }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <div className="relative">
      <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer">
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-neutral-900">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  </div>
);

const TextAreaField = ({ label, placeholder, rows = 4 }: { label: string; placeholder: string; rows?: number }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <textarea
      rows={rows}
      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ text }: { text: string }) => (
  <button className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
    {text}
    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </button>
);

// Specific Forms
function AdvertiseForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Name" placeholder="Your name" />
        <InputField label="Company" placeholder="Company name" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Email" type="email" placeholder="work@company.com" />
        <SelectField label="Campaign Budget" options={['$5k - $10k', '$10k - $50k', '$50k+', 'Not sure yet']} />
      </div>
      <TextAreaField label="Campaign Goals" placeholder="Tell us about your target audience and goals..." />
      <SubmitButton text="Request Media Kit" />
    </form>
  );
}

function InfoForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Name" placeholder="Your name" />
        <InputField label="Email" type="email" placeholder="you@example.com" />
      </div>
      <SelectField label="Topic" options={['General Inquiry', 'Press', 'Careers', 'Other']} />
      <TextAreaField label="Message" placeholder="How can we help you?" />
      <SubmitButton text="Send Message" />
    </form>
  );
}

function BuyBottlesForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Name" placeholder="Your name" />
        <InputField label="Email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField label="Quantity" options={['1-10 Bottles', '10-50 Bottles', '50+ Bottles (Bulk)']} />
        <InputField label="Shipping Country" placeholder="United States" />
      </div>
      <TextAreaField label="Additional Notes" placeholder="Any special requests or delivery instructions?" rows={3} />
      <SubmitButton text="Place Inquiry" />
    </form>
  );
}
