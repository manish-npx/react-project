import { dynamicFormSchema } from "@/config";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function DynamicForm() {
  const initialValues = dynamicFormSchema.fields.reduce((values, field) => {
    if (field.defaultValue !== undefined) {
      values[field.id] = field.defaultValue;
    } else if (field.componentType === "checkbox") {
      values[field.id] = false;
    } else {
      values[field.id] = "";
    }

    return values;
  }, {});

  const [formValues, setFormValues] = useState(initialValues);

  //homework
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleOnChange = (id, value) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const renderField = (getCurrentField) => {
    const { id, componentType, type, placeholder, required, label, options } =
      getCurrentField;
    const value = formValues[id];

    switch (componentType) {
      case "input":
        return (
          <div key={id}>
            <Label className={"mb-2"}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              placeholder={placeholder}
              name={id}
              type={type}
              value={value}
              onChange={(e) => handleOnChange(id, e.target.value)}
            />
          </div>
        );
      case "select":
        return (
          <div key={id}>
            <Label className={"mb-2"}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <select
              id={id}
              value={value}
              onChange={(e) => handleOnChange(id, e.target.value)}
            >
              {options && options.length > 0
                ? options?.map((optionItem) => (
                    <option key={optionItem.value} value={optionItem.value}>
                      {optionItem.label}
                    </option>
                  ))
                : null}
            </select>
          </div>
        );
      case "textarea":
        return (
          <div key={id}>
            <Label className={"mb-2"}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <textarea
              id={id}
              placeholder={placeholder}
              name={id}
              className="border border-green-600 p-5"
              value={value}
              onChange={(e) => handleOnChange(id, e.target.value)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={id}>
            <Label className={"mb-2"}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <input
              id={id}
              name={id}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) => handleOnChange(id, event.target.checked)}
            />
          </div>
        );

      default:
        return (
          <div key={id}>
            <Label className={"mb-2"}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              placeholder={placeholder}
              name={id}
              type={type}
              value={value}
              onChange={(e) => handleOnChange(id, e.target.value)}
            />
          </div>
        );
    }
  };

  console.log(formValues, "formValues");

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Dynamic Form</h1>
      <div className="mt-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            {dynamicFormSchema.fields.map((field) => renderField(field))}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default DynamicForm;
