import { useState } from "react";
import { addJob } from "../services/api";
export default function Jobform() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    notes: "",
    emailRemainder: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(form);
      alert("Job Added");
      setForm({
        company: "",
        role: "",
        status: "Applied",
        date: "",
        notes: "",
        emailRemainder: false,
      });
    } catch (error) {
      console.log("Error Adding job: ", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 border rounded-md shadow-md bg-white p-4"
      >
        <input
          type="text"
          name="company"
          id="company"
          placeholder="Company"
          required
          value={form.company}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="role"
          id="role"
          placeholder="Role"
          required
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <select
          name="status"
          id="status"
          className="w-full p-2 border rounded-md"
          value={form.status}
          onChange={handleChange}
        >
          <option>Applied</option>
          <option>Interviewed</option>
          <option>Offered</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          id="applied"
          className="w-full p-2 border rounded-md"
          value={form.date}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          id=""
          className="w-full p-2 border rounded-md"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="emailRemainder"
            id="emrem"
            checked={form.emailRemainder}
            onChange={handleChange}
          />{" "}
          <span>Email Remainder?</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Job
        </button>
      </form>
    </>
  );
}
