export default function Refund() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Header
        title="Refund & Cancellation"
        desc="Demo policy text (UI-only). Replace with official client policy."
      />

      <Section title="Cancellation">
        Orders can be cancelled before dispatch. Once shipped, cancellation may not be possible.
      </Section>

      <Section title="Returns">
        You can request a return if the item is damaged, incorrect, or has a manufacturing defect.
        Return requests must be raised within the allowed return window.
      </Section>

      <Section title="Refund Timeline">
        After the return is approved and the item is received, refunds are processed within a few business days.
        The final time depends on your bank/payment method.
      </Section>

      <Section title="Non-returnable Items">
        Some categories may be non-returnable due to hygiene or policy reasons (example: innerwear).
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
