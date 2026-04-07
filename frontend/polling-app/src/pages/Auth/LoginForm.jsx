import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/Input/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const LoginForm = () => {
  // STATE: store user input (React controls the form)
  const [email, setEmail] = useState(""); // email starts empty
  const [password, setPassword] = useState(""); // password starts empty

  // STATE: store error message (null = no error)
  const [error, setError] = useState(null);

  // navigation function (will be used after login success)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // Handle Login form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    // JS: prevents default form behavior (page refresh)
    // LOGIC: keep control inside React

    // VALIDATION 1: check email format
    if (!validateEmail(email)) {
      // JS: ! means "not valid"
      // LOGIC: if email is invalid → show error
      setError("Please enter a valid email address");
      return; // stop execution
    }

    // VALIDATION 2: check password exists
    if (!password) {
      // JS: empty string = false
      // LOGIC: if no password → show error
      setError("Please enter your password");
      return; // stop execution
    }

    // clear error if everything is valid
    setError("");

    //Login API
    try {
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {}
    // NEXT STEP (not done yet):
    // call backend → login → save token → navigate("/dashboard")
  };

  return (
    <AuthLayout>
      {/* UI container */}
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        {/* Title */}
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>

        {/* Subtitle */}
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <AuthInput
            value={email}
            // LOGIC: input displays state

            onChange={({ target }) => setEmail(target.value)}
            // JS: destructuring event → target.value
            // LOGIC: user types → update email state

            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <AuthInput
            value={password}
            // LOGIC: input linked to password state

            onChange={({ target }) => setPassword(target.value)}
            // LOGIC: user types → update password state

            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="button-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
