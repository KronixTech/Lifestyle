import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    alert("Message sent ✅ (UI-only). We will connect API later.");
    setName("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill the form and our support team will contact you (UI-only for now).
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <Input label="Your Name" value={name} setValue={setName} placeholder="Rohan Henry" />
            <Input
              label="Phone Number"
              value={phone}
              setValue={setPhone}
              placeholder="9876543210"
              inputMode="tel"
            />
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                className="mt-1 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              />
            </label>

            <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Send Message
            </button>
          </form>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-sm font-extrabold text-slate-900">Support Info</h2>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 90000 00000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>support@lifestyle.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Chennai, India (Demo)</span>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">Working Hours</p>
              <p className="mt-2 text-sm text-slate-600">
                Mon–Sat: 10 AM – 7 PM (IST)
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({ label, value, setValue, placeholder, inputMode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
      />
    </label>
  );
}
