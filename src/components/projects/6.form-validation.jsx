//requirements -> n , 3
//onchange, onBlur, onSubmit, all
//

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function FormValidation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be atleast 3 characters!";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (
      !form.email.includes("@") ||
      !form.email.includes(".") ||
      form.email.startsWith("@") ||
      form.email.endsWith("@")
    ) {
      newErrors.email = "Email must be valid";
    }

    const age = parseInt(form.age, 10);
    if (!form.age.trim()) {
      newErrors.age = "Age is required!";
    } else if (isNaN(age)) {
      newErrors.age = "Age must be a number!";
    } else if (age < 1 || age > 150) {
      newErrors.age = "Age must be between 1 and 150!";
    }

    return newErrors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Validate Form</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <Label>Name</Label>
          <Input
            name="name"
            type="text"
            value={form.name}
            onChange={handleOnChange}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded text-sm"
            }
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-sm text-red-700 mt-2">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleOnChange}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded text-sm"
            }
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-700 mt-2">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label>Age</Label>
          <Input
            name="age"
            type="text"
            value={form.age}
            onChange={handleOnChange}
            className={
              "w-full px-3 py-2 border border-gray-300 rounded text-sm"
            }
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-sm text-red-700 mt-2">{errors.age}</p>
          )}
        </div>
        <Button className={"mt-5"} type="submit">
          Submit
        </Button>
      </form>
      {submitted && (
        <div className="mt-4 p-3 bg-green-100 rounded text-green-700 text-sm">
          Form submitted successfully
        </div>
      )}
    </div>
  );
}

export default FormValidation;
