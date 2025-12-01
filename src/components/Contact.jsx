import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const onSubmit = async (e) => {
  e.preventDefault();

  if (!name.trim() || !phone.trim() || !address.trim()) {
    setFeedback({ type: "error", message: "Enter name, phone, and address." });
    return;
  }

  const digits = phone.replace(/\D+/g, "");
  if (digits.length < 10) {
    setFeedback({ type: "error", message: "Enter a valid phone number." });
    return;
  }

  setSubmitting(true);

  try {
    const endpoint =
      import.meta.env.VITE_LEAD_ENDPOINT ||
      "https://script.google.com/macros/s/AKfycbwEOCJUPBaduwo449Cl944rZ8pH6bEc7XpNY91zvk-NhOaK2f-9EuklX2yCjyjDN5DOmA/exec";

    const form = new FormData();
    form.append("name", name);
    form.append("phone", phone);
    form.append("address", address);
    
    const res = await fetch(endpoint, {
      method: "POST",
      body: form,
    });

    // Apps Script returns text, not JSON
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: true }; // fallback if response isn't JSON
    }

    if (data.ok) {
      setFeedback({ type: "success", message: "Submitted successfully." });
      setName("");
      setPhone("");
      setAddress("");
    } else {
      setFeedback({ type: "error", message: "Error: " + data.error });
    }
  } catch (err) {
    console.error(err);
    setFeedback({ type: "error", message: "Submission failed." });
  } finally {
    setSubmitting(false);
    setTimeout(() => setFeedback(null), 4000);
  }
};
  return (
    <section id="contact" className="contact">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Ready for cleaner water?</h2>
      </div>

      {feedback && (
        <div className={`submit-feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            disabled={submitting}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            value={phone}
            disabled={submitting}
            placeholder="Your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          value={address}
          disabled={submitting}
          placeholder="Street, area, city"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      

        <button className="btn primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Number"}
        </button>
      </form>
    </section>
  );
}
