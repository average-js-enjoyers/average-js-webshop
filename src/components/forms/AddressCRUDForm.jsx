//src/components/forms/AddressCRUDForm.jsx

import Button from "components/common/Button";
import React, { useState, useEffect } from "react";
import { useAuth } from "hooks";

export default function AddressCRUDForm({ type }) {
  const { addAddress } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    type: [type], // Set the initial value of the type checkbox based on the prop
    country: "",
    zip: "",
    city: "",
    region: "",
    street: "",
    phoneNumber: "",
    company: "",
    vatID: "",
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the input is a checkbox
    if (type === "checkbox") {
      // For checkboxes that handle array values (like 'type')
      if (name === "type") {
        const updatedType = [...formData.type];
        if (checked) {
          updatedType.push(value);
        } else {
          const index = updatedType.indexOf(value);
          if (index !== -1) {
            updatedType.splice(index, 1);
          }
        }
        setFormData({ ...formData, type: updatedType });
      } else {
        // For regular checkboxes like 'isActive'
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      // For other input types
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here

    /* const requestBody = {
      ...formData,
      addressLine: formData.street,
      type:
        formData.type.length === 2
          ? "Both"
          : formData.type[0].slice(0, 1).toUpperCase() +
            formData.type[0].slice(1),
      }; */

    // TODO - Remove after backend is implemented
    const requestBody = {
      unitNumber: "12345",
      streetNumber: "12343",
      addressLine1: "Rabbit street",
      city: "New York",
      region: "EAST COAST",
      postalCode: "2483",
      vatID: "6326434",
      country: "US",
      type: "Both",
    };

    // Send POST request to /api/user/profile/address with Bearer token and requestBody

    console.log("Form data submitted:", requestBody);

    addAddress(requestBody);
  };

  return (
    <>
      <h3 style={{ fontWeight: "bold" }}>
        {" "}
        <span
          style={{
            fontSize: "4rem",
            lineHeight: "1",
            display: "inline-block",
            transform: "scale(1.1) rotate(-10deg)",
          }}
        >
          📨
        </span>{" "}
        Add New Address
      </h3>
      <form onSubmit={handleSubmit} className="form--profile">
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label>Address Type</label>
          <div>
            {["shipping", "billing"].map((typeOption) => (
              <div className="checkbox mt-2" key={typeOption}>
                <input
                  type="checkbox"
                  name="type"
                  value={typeOption}
                  checked={formData.type.includes(typeOption)}
                  onChange={handleChange}
                  id={typeOption} // Unique ID for each checkbox
                  className="custom-checkbox" // Same class for consistent styling
                />
                <label htmlFor={typeOption}>{`${
                  typeOption.charAt(0).toUpperCase() + typeOption.slice(1)
                } address`}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            value={formData.country}
            name="country"
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region or County</label>
          <input
            id="region"
            type="text"
            value={formData.region}
            name="region"
            onChange={handleChange}
            placeholder="Region or County"
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <div className="form-group" style={{ width: "25%" }}>
            <label htmlFor="zip">ZIP Code</label>
            <input
              id="zip"
              type="text"
              value={formData.zip}
              name="zip"
              onChange={handleChange}
              placeholder="ZIP Code"
            />
          </div>
          <div className="form-group" style={{ flexGrow: "1" }}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              name="city"
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={formData.street}
            name="street"
            onChange={handleChange}
            placeholder="Street"
          />
        </div>
        {formData.type.includes("billing") && (
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={formData.company}
              name="company"
              onChange={handleChange}
              placeholder="Company"
            />
          </div>
        )}
        {formData.type.includes("billing") && (
          <div className="form-group">
            <label htmlFor="vatID">VAT ID</label>
            <input
              id="vatID"
              type="text"
              value={formData.vatID}
              name="vatID"
              onChange={handleChange}
              placeholder="VAT ID"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="form-group">
          <label>Primary address</label>
          <div>
            <div className="checkbox mt-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                id="isActive" // Corrected ID to match with label's htmlFor
                className="custom-checkbox"
              />
              <label htmlFor="isActive">Set as primary address</label>{" "}
              {/* Corrected htmlFor */}
            </div>
          </div>
        </div>

        <Button
          disabled={formData.type.length === 0 && true}
          onClick={handleSubmit}
          variant={"primary"}
          className="mt-3"
        >
          Add New Address
        </Button>
      </form>
    </>
  );
}
