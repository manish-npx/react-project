import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function PasswordStrengthCheck() {
  const [password, setPassword] = useState("");
  const [power, setPower] = useState(0); //0 - 100
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    calculatePasswordPower(password);
  }, [password]);

  const calculatePasswordPower = (password) => {
    if (!password) {
      setPower(0);
      setFeedback("");
      return;
    }

    let score = 0;
    const feedbackItems = [];

    //max 25 points
    const lengthScore = Math.min(25, Math.floor(password.length * 2.5));
    score += lengthScore;

    //check for numbers
    const hasNumbers = /\d/.test(password);

    if (hasNumbers) {
      score += 25;
      feedbackItems.push("Password contains numbers!");
    }

    const hasLowercase = /[a-z]/.test(password);

    if (hasLowercase) {
      score += 15;
      feedbackItems.push("Password contains lowercase letters!");
    }

    const hasUpperCase = /[A-Z]/.test(password);

    if (hasUpperCase) {
      score += 15;
      feedbackItems.push("Password contains uppercase letters!");
    }

    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (hasSpecialChar) {
      score += 20;
      feedbackItems.push("Password contains special characters!");
    }

    score = Math.min(100, score);

    setPower(score);

    if (score < 25) {
      setFeedback("Weak password");
    } else if (score < 60) {
      setFeedback("Moderate password");
    } else if (score < 80) {
      setFeedback("Strong password");
    } else {
      setFeedback("Very strong password");
    }
  };

  console.log(power, feedback);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Password Strength Check</h1>
      <div className="mt-5">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your strong password here ..."
          />
        </div>
        {password && (
          <div className="space-y-2 mt-10">
            <div className="flex justify-between">
              <span>Strength:</span>
              <span>{power}</span>
            </div>
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordStrengthCheck;
