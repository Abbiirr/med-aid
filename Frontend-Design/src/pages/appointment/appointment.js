import React, { useReducer, useState } from "react";
import "./appointment.css";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      apple: "",
      count: 0,
      name: "",
      "gift-wrap": false,
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true,
      });
    }, 1000);
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <div className="wrapper">
      <h1>How About Them Apples</h1>
      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>: {value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          {/* disabled={submitting} */}
          <label>
            <p>Name</p>
            <input
              name="name"
              onChange={handleChange}
              value={formData.name || ""}
            />
          </label>
        </fieldset>
        <fieldset>
          {/* disabled={submitting} */}
          <label>
            <p>Apples</p>
            <select
              name="apple"
              onChange={handleChange}
              value={formData.apple || ""}
            >
              <option value="">--Please choose an option--</option>
              <option value="fuji">Fuji</option>
              <option value="jonathan">Jonathan</option>
              <option value="honey-crisp">Honey Crisp</option>
            </select>
          </label>
          <label>
            <p>Count</p>
            <input
              type="number"
              name="count"
              onChange={handleChange}
              step="1"
              value={formData.count || ""}
            />
          </label>
          <label>
            <p>Gift Wrap</p>
            <input
              checked={formData["gift-wrap"] || false}
              name="gift-wrap"
              onChange={handleChange}
              type="checkbox"
            />
          </label>
        </fieldset>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
