"use client";

import { useState } from "react";
import "./Form.css";

export default function Form() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [popup, setPopup] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setResponseData(data.data);
      setPopup(data.message);
      setFormData({ name: "", email: "" });
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Professional Form</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <button className="btn" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Submit"}
        </button>
      </form>

      {popup && <div className="popup">{popup}</div>}

      {responseData && (
        <div className="info-card">
          <h3>Submitted Information</h3>
          <p><strong>Name:</strong> {responseData.name}</p>
          <p><strong>Email:</strong> {responseData.email}</p>
          <p><strong>Submitted At:</strong> {responseData.submittedAt}</p>
        </div>
      )}
    </div>
  );
}