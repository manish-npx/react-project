import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function TempConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const celsiusToFarhrenheit = (value) => {
    return (value * 9) / 5 + 32;
  };

  const fahrenheitToCelsius = (value) => {
    return ((value - 32) * 5) / 9;
  };

  const handleCelsiusToFahrenheit = (value) => {
    setCelsius(value);

    if (value === "") {
      setFahrenheit("");
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const res = celsiusToFarhrenheit(numValue);
        setFahrenheit(res.toFixed(2));
      }
    }
  };

  const handleFahrenheitToCelsius = (value) => {
    setFahrenheit(value);
    if (value === "") {
      setCelsius("");
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const res = fahrenheitToCelsius(numValue);
        setCelsius(res.toFixed(2));
      }
    }
  };

  const formatValue = (value) => {
    if (value === "") return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    if (Number.isInteger(numValue)) {
      return numValue.toString();
    }

    return numValue.toFixed(2);
  };

  console.log(celsius, fahrenheit);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Temperature Converter</h1>
      <div className="flex mt-10 flex-col justify-center items-center gap-5">
        <Label>Celsius</Label>
        <Input
          id="celsius"
          type="number"
          value={formatValue(celsius)}
          onChange={(event) => handleCelsiusToFahrenheit(event.target.value)}
          placeholder="0"
        />

        <Label>Fahrenheit</Label>
        <Input
          id="fahrenheit"
          type="number"
          value={formatValue(fahrenheit)}
          onChange={(event) => handleFahrenheitToCelsius(event.target.value)}
          placeholder="32"
        />
      </div>
    </div>
  );
}

export default TempConverter;
