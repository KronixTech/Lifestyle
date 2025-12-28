import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Header
        title="Terms & Conditions"
        desc="These are demo terms for UI. Replace with your client’s official policy text."
      />

      <Section title="1. Overview">
        Lifestyle provides products through this website. By using the site, you agree to follow
        these terms. If you do not agree, please do not use the website.
      </Section>

      <Section title="2. Account & Login">
        Login is phone-number based. You are responsible for maintaining access to your phone number
        and protecting any OTP/password used in the future.
      </Section>

      <Section title="3. Pricing & Availability">
        Prices and product availability may change without notice. We try to keep details accurate,
        but errors can happen.
      </Section>

      <Section title="4. Orders & Payments">
        Orders are confirmed only after successful payment. Payment integration is shown as a placeholder
        and will be connected later.
      </Section>

      <Section title="5. Delivery">
        Delivery timelines depend on location and logistics partners. Estimated delivery times are
        shown during checkout.
      </Section>

      <Section title="6. Returns & Refunds">
        Please refer to our{" "}
        <Link className="font-semibold text-slate-900 hover:underline" to="/refund">
          Refund & Cancellation Policy
        </Link>
        .
      </Section>

      <Section title="7. Customer Support">
        For help, visit{" "}
        <Link className="font-semibold text-slate-900 hover:underline" to="/support">
          Customer Support
        </Link>{" "}
        or{" "}
        <Link className="font-semibold text-slate-900 hover:underline" to="/contact">
          Contact Us
        </Link>
        .
      </Section>
    </div>
  );
}

function Header({ title, desc }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}
